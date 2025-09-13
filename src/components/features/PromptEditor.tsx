'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function PromptEditor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  
const QUICK_SNIPPETS = [
  'Explain this',
  'Improve code',
  'Add comments',
  'Debug issue',
  'Optimize',
  'Test cases'
];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateClaudeResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I'm Claude, an AI assistant created by Anthropic. I'm here to help you with a wide variety of tasks, from answering questions and helping with analysis to creative writing and coding. What would you like to work on today?",
        "That's an interesting question! I'd be happy to help you explore that topic further. Could you provide a bit more context so I can give you the most relevant information?",
        "I understand what you're looking for. Let me break this down step by step to make sure I address all aspects of your question thoroughly.",
        "Thank you for sharing that with me. Based on what you've described, here are some thoughts and suggestions that might be helpful.",
        "That's a great point to consider. There are several approaches we could take here, each with their own advantages. Let me outline a few options for you."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    simulateClaudeResponse();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 text-gray-400">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-sm ml-2">Claude is typing...</span>
    </div>
  );

  const insertSnippet = (snippet: string) => {
    const newPrompt = inputValue + (inputValue ? ' ' : '') + snippet;
    setInputValue(newPrompt);
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-orange-400" />
          <span className="font-semibold text-lg">Claude</span>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h1 className="text-2xl font-semibold mb-2 text-gray-100">
                  Good afternoon, Mihir
                </h1>
                <p className="text-gray-400">
                  How can I help you today?
                </p>
              </div>
            </div>
          
          </div>
        ) : (
          /* Messages */
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white ml-12'
                        : 'bg-gray-800 text-gray-100 mr-12'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 rounded-2xl px-4 py-3 mr-12">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-800 px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-end space-x-3 bg-gray-800 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 transition-all">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={messages.length === 0 ? "How can I help you today?" : "Message Claude..."}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[24px] max-h-[120px] py-1"
                  rows={1}
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    inputValue.trim() && !isTyping
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
        {QUICK_SNIPPETS.map((snippet) => (
          <button
            key={snippet}
            onClick={() => insertSnippet(snippet)}
            className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-200 rounded-full whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {snippet}
          </button>
        ))}
      </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Claude can make mistakes. Please double-check responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}