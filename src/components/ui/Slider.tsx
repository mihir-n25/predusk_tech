import React, { useEffect, useMemo, useRef, useState } from "react";

type Template = { id: string; name: string; content: string };

type Props = {
  value?: string;
  templates?: Template[];
  readOnly?: boolean;
  error?: string | null;
  onChange?: (v: string) => void;
  onSave?: (v: string, templateId?: string | null) => void;
  placeholder?: string;
  className?: string;
  mobileCompact?: boolean; // show compact mobile composer by default
};

// small token estimate heuristic: characters / 4 -> tokens (very rough)
function estimateTokens(text = "") {
  const chars = text.length;
  return Math.max(0, Math.ceil(chars / 4));
}

function formatPrompt(text: string) {
  // simple, safe formatter for templates: trim lines, remove trailing spaces,
  // collapse >1 empty lines to single empty line, preserve indentation
  const lines = text.split("\n").map((l) => l.replace(/[ \t]+$/g, ""));
  const cleaned: string[] = [];
  let blankStreak = 0;
  for (const ln of lines) {
    if (ln.trim() === "") {
      blankStreak++;
      if (blankStreak <= 1) cleaned.push("");
    } else {
      blankStreak = 0;
      cleaned.push(ln);
    }
  }
  return cleaned.join("\n").trimEnd() + "\n";
}

export default function PromptEditor({
  value = "",
  templates = [],
  readOnly = false,
  error = null,
  onChange,
  onSave,
  placeholder = "Start writing a prompt — describe the assistant's role, task, and constraints...",
  className = "",
  mobileCompact = false,
}: Props) {
  const [text, setText] = useState<string>(value);
  const [templateId, setTemplateId] = useState<string | null>(templates[0]?.id ?? null);
  const [focused, setFocused] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(mobileCompact);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (!mod) return;

      // Ctrl/Cmd+S -> save
      if ((e.key === "s" || e.key === "S") && onSave) {
        e.preventDefault();
        onSave(text, templateId ?? null);
      }

      // Ctrl/Cmd+Enter -> quick send/save
      if (e.key === "Enter") {
        e.preventDefault();
        onSave?.(text, templateId ?? null);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [text, onSave, templateId]);

  const tokens = useMemo(() => estimateTokens(text), [text]);

  function handleInsertToken(token: string) {
    if (readOnly) return;
    const t = textareaRef.current;
    if (!t) return setText((s) => s + ` ${token} `);
    const start = t.selectionStart ?? text.length;
    const end = t.selectionEnd ?? start;
    const newText = text.slice(0, start) + token + text.slice(end);
    setText(newText);
    onChange?.(newText);
    // restore cursor after next paint
    requestAnimationFrame(() => {
      t.focus();
      const pos = start + token.length;
      t.setSelectionRange(pos, pos);
    });
  }

  function handleFormat() {
    if (readOnly) return;
    const formatted = formatPrompt(text);
    setText(formatted);
    onChange?.(formatted);
  }

  function handleSave() {
    onSave?.(text, templateId ?? null);
  }

  function handleChooseTemplate(id: string | null) {
    setTemplateId(id);
    const t = templates.find((x) => x.id === id);
    if (t) {
      setText(t.content);
      onChange?.(t.content);
    }
  }

  const stateClass = readOnly
    ? "ring-0 border-0 bg-transparent/10"
    : error
    ? "ring-2 ring-red-600"
    : focused
    ? "ring-2 ring-indigo-500"
    : "ring-1 ring-white/6";

  // Line numbers
  const lines = (text || placeholder).split('\n');

  // Compact mobile composer single-line view
  if (mobileCollapsed) {
    return (
      <div className={`w-full max-w-2xl ${className}`}>
        <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-3 py-2 backdrop-blur-sm border border-white/6">
          <button
            className="text-sm font-medium text-white/80 px-2 py-1 rounded-md bg-white/3"
            onClick={() => setMobileCollapsed(false)}
            aria-label="Expand composer"
          >
            + Compose
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-white/85 placeholder:text-white/40 font-mono"
            placeholder={placeholder}
            value={text.split('\n')[0] ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              // keep only first line in compact mode
              setText((s) => v + (s.includes('\n') ? '\n' + s.split('\n').slice(1).join('\n') : ''));
              onChange?.(text);
            }}
          />
          <div className="flex items-center gap-2">
            <div className="text-xs text-white/50">{tokens} tokens</div>
            <button
              onClick={handleSave}
              disabled={readOnly}
              className="text-xs px-2 py-1 rounded-md bg-indigo-600/90 hover:bg-indigo-600/100 disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-3xl ${className}`}>
      {/* outer glass container */}
      <div
        className={`relative rounded-2xl p-3 bg-gradient-to-b from-white/3 to-white/2/5 backdrop-blur-[6px] border border-white/6 shadow-2xl ${stateClass}`}
        aria-live="polite"
      >
        {/* toolbar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {/* Template dropdown */}
            <div className="relative">
              <select
                className="bg-transparent text-sm text-white/90 px-3 py-1 rounded-md border border-white/6 outline-none appearance-none font-medium"
                value={templateId ?? "__none"}
                onChange={(e) => handleChooseTemplate(e.target.value === "__none" ? null : e.target.value)}
                disabled={readOnly}
                aria-label="Select template"
              >
                <option value="__none">Template</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">▾</div>
            </div>

            {/* Insert variable token button */}
            <div className="flex items-center gap-2">
              <button
                className="text-sm px-2 py-1 rounded-md bg-white/4 hover:bg-white/6 font-medium"
                onClick={() => handleInsertToken("{{user_name}}")}
                disabled={readOnly}
                title="Insert variable token"
              >
                Insert token
              </button>

              {/* Format button */}
              <button
                className="text-sm px-2 py-1 rounded-md bg-white/4 hover:bg-white/6 font-medium"
                onClick={handleFormat}
                disabled={readOnly}
                title="Format prompt"
              >
                Format
              </button>
            </div>
          </div>

          {/* Right side buttons: save template etc */}
          <div className="flex items-center gap-2">
            <div className="text-xs text-white/50 mr-2">{error ? <span className="text-red-400">Error</span> : focused ? <span className="text-indigo-300">Editing</span> : <span className="text-white/40">Idle</span>}</div>
            <button
              className="text-sm px-3 py-1 rounded-md bg-white/4 hover:bg-white/6 font-medium"
              onClick={() => {
                // quick create template locally — in real app you'd open modal
                const name = `Untitled ${new Date().toISOString().slice(11, 19)}`;
                const id = Math.random().toString(36).slice(2, 9);
                templates.push({ id, name, content: text });
                setTemplateId(id);
                // don't call onSave; this is create template action
              }}
              disabled={readOnly}
            >
              Save template
            </button>
            <button
              className="text-sm px-3 py-1 rounded-md bg-indigo-600/95 hover:bg-indigo-600/100 font-medium"
              onClick={handleSave}
              disabled={readOnly}
            >
              Save
            </button>
          </div>
        </div>

        {/* editor area */}
        <div className={`relative rounded-xl overflow-hidden border border-white/6 ${readOnly ? 'bg-black/30' : 'bg-black/40'} `}>
          <div className="flex">
            {/* line numbers */}
            <div className="select-none text-right px-3 py-3 pr-2 text-xs font-mono text-white/40 bg-black/20 border-r border-white/4">
              {lines.map((_, i) => (
                <div key={i} className="leading-5 h-5">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* textarea */}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                onChange?.(e.target.value);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={placeholder}
              readOnly={readOnly}
              className={`w-full p-3 min-h-[160px] resize-y outline-none text-sm font-mono leading-5 bg-transparent text-white placeholder:text-white/30 caret-indigo-400`}
              spellCheck={false}
              aria-label="Prompt editor"
            />
          </div>

          {/* bottom subtle helper row inside editor */}
          <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-4 py-2 bg-gradient-to-t from-black/50 to-transparent">
            <div className="text-xs text-white/50 font-mono">{placeholder && !text ? <em className="text-white/30">{placeholder}</em> : null}</div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/50 font-mono">{tokens} tokens</div>
              <div className="text-xs text-white/40">{text.length} chars</div>
            </div>
          </div>
        </div>

        {/* keyboard hint overlays */}
        <div className="mt-3 flex items-center gap-3">
          <kbd className="px-2 py-1 rounded bg-white/6 text-xs text-white/80 font-medium">Ctrl/Cmd + S</kbd>
          <span className="text-xs text-white/50">to save</span>

          <kbd className="px-2 py-1 rounded bg-white/6 text-xs text-white/80 font-medium">Ctrl/Cmd + Enter</kbd>
          <span className="text-xs text-white/50">to save & execute</span>
        </div>

        {/* error or readonly banners */}
        {error ? (
          <div className="mt-3 rounded-md bg-red-900/60 px-3 py-2 text-sm text-red-100">{error}</div>
        ) : null}

        {readOnly ? (
          <div className="mt-3 rounded-md bg-yellow-900/30 px-3 py-2 text-sm text-yellow-100">Read-only mode — changes disabled</div>
        ) : null}
      </div>

      {/* states showcase (for demo only) */}
      <div className="mt-4 flex gap-2 text-xs text-white/60">
        <div className="px-2 py-1 rounded bg-white/4">State: {readOnly ? 'readonly' : focused ? 'focused' : error ? 'error' : 'idle'}</div>
        <button className="px-2 py-1 rounded bg-white/4" onClick={() => setText('')}>Clear</button>
        <button className="px-2 py-1 rounded bg-white/4" onClick={() => setText((s) => (s ? s : 'Example: Act as a helpful assistant that ...'))}>Example</button>
        <button className="px-2 py-1 rounded bg-white/4" onClick={() => setMobileCollapsed(true)}>Compact mobile</button>
      </div>
    </div>
  );
}
