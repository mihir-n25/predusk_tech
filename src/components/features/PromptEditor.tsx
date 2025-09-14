"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, Sparkles, Cpu } from "lucide-react";
import { ModelSelector } from "./ModelSelector";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  showParams?: boolean;
}
interface ModelData {
  id: string;
  name: string;
  descriptor: string;
  avatar: string;
  maxTokens?: string;
  price?: string;
  category: "gpt" | "Mirofy" | "palm" | "custom";
  disabled?: boolean;
  samplePrompts?: string[];
  features?: string[];
}

const sampleModels: ModelData[] = [
  {
    id: "gpt-4-turbo",
    name: "Mirofy Devkit",
    descriptor: "Most capable model for developers",
    avatar:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=80&fit=crop&crop=center",
    maxTokens: "128K",
    category: "gpt",
    samplePrompts: [
      "Explain quantum computing to a 5-year-old",
      "Write a Python function to analyze sentiment",
      "Create a marketing strategy for a new product",
    ],
    features: ["Advanced reasoning", "Code generation", "Data analysis"],
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    descriptor: "Fast and efficient for most tasks",
    avatar:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=80&fit=crop&crop=center",
    price: "$0.002/1K",
    category: "gpt",
    samplePrompts: [
      "Summarize this article",
      "Generate creative writing ideas",
      "Help with homework questions",
    ],
    features: ["Fast responses", "Cost effective", "General purpose"],
  },
  {
    id: "Mirofy-3-opus",
    name: "Mirofy Sketch",
    descriptor: "Best model for image generation",
    avatar:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=80&h=80&fit=crop&crop=center",
    maxTokens: "200K",
    category: "Mirofy",
    samplePrompts: [
      "Analyze this research paper",
      "Write a technical specification",
      "Solve complex math problems",
    ],
    features: ["Long context", "Research analysis", "Technical writing"],
  },
  {
    id: "Mirofy-3-sonnet",
    name: "Mirofy 3 Sonnet",
    descriptor: "Balanced performance and speed",
    avatar:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=80&h=80&fit=crop&crop=center",
    price: "$0.015/1K",
    category: "Mirofy",
    disabled: true,
    samplePrompts: [
      "Creative writing assistance",
      "Code review and optimization",
      "Business document drafting",
    ],
    features: ["Balanced speed", "Creative tasks", "Code assistance"],
  },
];

export default function PromptEditor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedModel(modelId);
      setLoading(false);
    }, 1000);
  };

  const QUICK_SNIPPETS = [
    "Explain this",
    "Improve code",
    "Add comments",
    "Debug issue",
    "Optimize",
    "Test cases",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateMirofyResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I'm Mirofy, an AI assistant here to help you with analysis, writing, or coding. What would you like to work on today?",
        "That’s an interesting question! Could you provide a bit more context so I can give you the most relevant information?",
        "I understand what you’re looking for. Let me break this down step by step.",
        "Thank you for sharing that. Based on what you’ve described, here are some thoughts and suggestions.",
        "That’s a great point. Here are a few approaches we could take.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: randomResponse,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    simulateMirofyResponse();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-gray-400 text-sm">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <span>Mirofy is typing…</span>
    </div>
  );

  const insertSnippet = (snippet: string) => {
    const newPrompt = inputValue + (inputValue ? " " : "") + snippet;
    setInputValue(newPrompt);
    textareaRef.current?.focus();
  };

  async function handleCopy(m: Message) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(m.content);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  function handleDownloadJSON(m: Message) {
    downloadJSON(m, `response-${m.id}.json`);
  }

  function downloadJSON(obj: unknown, filename = "response.json") {
    const data = JSON.stringify(obj, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRegenerate(m: Message) {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Here’s a refined version of that response.",
        "Let me reframe that explanation for clarity.",
        "Here’s another perspective you might find useful.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === m.id
            ? { ...msg, content: randomResponse, timestamp: new Date() }
            : msg
        )
      );
      setIsTyping(false);
    }, 1000);
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col">
      {isPopupOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Select AI Model</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <ModelSelector
              models={sampleModels}
              selectedModel={selectedModel}
              onModelSelect={(modelId) => {
                handleModelSelect(modelId);
                setIsPopupOpen(false);
              }}
              variant="list"
              loading={loading}
            />
          </div>
        </div>
      )}
      {/* Header */}
      <header className="border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-lg">Mirofy</span>
        </div>
        <button
          onClick={() => {
            setIsPopupOpen(true);
            console.log("Select Model");
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors text-sm"
        >
          <Cpu className="w-4 h-4 text-blue-400" />
          Select Model
        </button>
      </header>

      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-semibold mb-2 text-gray-100">
                {getGreeting()}, ProcessVenue
              </h1>
              <p className="text-gray-400">
                Ask me anything — I’ll help with code, docs, or ideas.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <div
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.isUser
                          ? "bg-blue-600 text-white"
                          : "bg-neutral-800 text-gray-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>

                  {/* Actions for assistant messages */}
                  {!message.isUser && (
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                      <button
                        onClick={() => handleCopy(message)}
                        className="hover:text-gray-200"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDownloadJSON(message)}
                        className="hover:text-gray-200"
                      >
                        Download JSON
                      </button>
                      <button
                        onClick={() => handleRegenerate(message)}
                        className="hover:text-gray-200"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={() =>
                          setMessages((ms) =>
                            ms.map((x) =>
                              x.id === message.id
                                ? { ...x, showParams: !x.showParams }
                                : x
                            )
                          )
                        }
                        className="hover:text-gray-200"
                      >
                        Why this response?
                      </button>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 text-gray-100 rounded-2xl px-4 py-3">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-neutral-800 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end space-x-3 bg-neutral-900 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
  <textarea
    ref={textareaRef}
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder={
      messages.length === 0
        ? "How can I help you today?"
        : "Message Mirofy..."
    }
    className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none min-h-[24px] max-h-[120px] py-1"
    rows={1}
    disabled={isTyping}
  />

  {/* Selected Model Display */}
  <div className="flex my-auto justify-center items-center gap-2 mr-2 text-center">
    <span className="text-sm text-gray-400">Model:</span>
    <button onClick={() => setIsPopupOpen(true)} className="text-sm font-medium text-blue-400 cursor-pointer">
      {sampleModels.find((m) => m.id === selectedModel)?.name}
    </button>
  </div>

  <button
    type="submit"
    disabled={!inputValue.trim() || isTyping}
    className={`p-2 rounded-lg transition-all duration-200 ${
      inputValue.trim() && !isTyping
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-neutral-800 text-gray-500 cursor-not-allowed"
    }`}
  >
    <Send className="w-4 h-4" />
  </button>
</div>

            </form>

            {/* Quick snippets */}
            <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
              {QUICK_SNIPPETS.map((snippet) => (
                <button
                  key={snippet}
                  onClick={() => insertSnippet(snippet)}
                  className="px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full text-gray-300 transition-all"
                >
                  {snippet}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              ⚠️ Mirofy may make mistakes. Verify responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
