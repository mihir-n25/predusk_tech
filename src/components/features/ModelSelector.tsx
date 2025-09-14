import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Zap, Brain, Sparkles, Clock, Settings, Star } from 'lucide-react';

// Types
interface ModelData {
  id: string;
  name: string;
  descriptor: string;
  avatar: string;
  maxTokens?: string;
  price?: string;
  category: 'gpt' | 'Mirofy' | 'palm' | 'custom';
  disabled?: boolean;
  samplePrompts?: string[];
  features?: string[];
}

interface ModelSelectorProps {
  models: ModelData[];
  selectedModel?: string;
  onModelSelect: (modelId: string) => void;
  onSetDefault?: (modelId: string) => void;
  variant?: 'list' | 'dropdown';
  loading?: boolean;
  className?: string;
}

// Icons
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M13 2L13.5 3.5L15 4L13.5 4.5L13 6L12.5 4.5L11 4L12.5 3.5L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
);

// Model List Item Component
const ModelListItem: React.FC<{
  model: ModelData;
  isSelected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
  loading?: boolean;
}> = ({ model, isSelected, onSelect, onShowDetails, loading }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative h-14 flex items-center px-4 cursor-pointer transition-all duration-200 group
        ${isSelected 
          ? 'bg-white/10 backdrop-blur-lg border border-white/20' 
          : 'hover:bg-white/5 border border-transparent'
        }
        ${model.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${isHovered && !model.disabled ? 'shadow-lg shadow-black/20' : ''}
        rounded-xl
      `}
      onClick={() => !model.disabled && onSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={model.disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !model.disabled) {
          e.preventDefault();
          onSelect();
        }
      }}
      role="option"
      aria-selected={isSelected}
      aria-disabled={model.disabled}
    >
      {/* Gradient bar for selected state */}
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r-full"></div>
      )}

      {/* Focus ring */}
      <div className={`
        absolute inset-0 rounded-xl transition-all duration-200
        ${isSelected ? 'ring-2 ring-purple-400/50 ring-offset-2 ring-offset-gray-900' : ''}
      `}></div>

      <div className="flex items-center flex-1 gap-3 ml-2">
        {/* Avatar */}
        <div className="relative">
          <img
            src={model.avatar}
            alt={`${model.name} avatar`}
            className="w-9 h-9 rounded-full object-cover border-2 border-white/10"
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <LoadingSpinner />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white text-sm truncate">
              {model.name}
            </h3>
            {model.disabled && (
              <Clock className="w-3 h-3 text-gray-400" />
            )}
          </div>
          <p className="text-gray-400 text-xs truncate">
            {model.descriptor}
          </p>
        </div>

        {/* Pills */}
        <div className="flex items-center gap-2">
          {model.maxTokens && (
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
              {model.maxTokens}
            </span>
          )}
          {model.price && (
            <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-medium">
              {model.price}
            </span>
          )}
          
          {/* Details button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded-md"
            aria-label="Show model details"
          >
            <Settings className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Model Detail Modal
const ModelDetailModal: React.FC<{
  model: ModelData;
  isOpen: boolean;
  onClose: () => void;
  onSetDefault?: (modelId: string) => void;
}> = ({ model, isOpen, onClose, onSetDefault }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src={model.avatar}
              alt={`${model.name} avatar`}
              className="w-12 h-12 rounded-xl object-cover border border-white/10"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{model.name}</h2>
              <p className="text-gray-400 text-sm">{model.descriptor}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          {model.maxTokens && (
            <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="text-blue-300 text-xs font-medium">Max Tokens</div>
              <div className="text-white font-semibold">{model.maxTokens}</div>
            </div>
          )}
          {model.price && (
            <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-green-300 text-xs font-medium">Price</div>
              <div className="text-white font-semibold">{model.price}</div>
            </div>
          )}
        </div>

        {/* Features */}
        {model.features && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Key Features
            </h3>
            <div className="space-y-2">
              {model.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Prompts */}
        {model.samplePrompts && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white mb-3">Sample Prompts</h3>
            <div className="space-y-2">
              {model.samplePrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => navigator.clipboard.writeText(prompt)}
                >
                  "{prompt}"
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onSetDefault?.(model.id)}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Star className="w-4 h-4" />
            Set as Default
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Model Selector Component
export const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModel,
  onModelSelect,
  onSetDefault,
  variant = 'list',
  loading = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailModel, setDetailModel] = useState<ModelData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedModelData = models.find(m => m.id === selectedModel);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && variant === 'dropdown') {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen, variant]);

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-14 flex items-center justify-between px-4 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-gray-800/70 transition-all duration-200 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedModelData ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedModelData.avatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
              <div className="text-left">
                <div className="font-semibold text-white text-sm">{selectedModelData.name}</div>
                <div className="text-gray-400 text-xs">{selectedModelData.descriptor}</div>
              </div>
            </div>
          ) : (
            <span className="text-gray-400">Select a model</span>
          )}
          <ChevronDownIcon />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/20 py-2 z-50 max-h-64 overflow-y-auto">
            {models.map((model) => (
              <div key={model.id} className="px-2">
                <ModelListItem
                  model={model}
                  isSelected={model.id === selectedModel}
                  onSelect={() => {
                    onModelSelect(model.id);
                    setIsOpen(false);
                  }}
                  onShowDetails={() => setDetailModel(model)}
                  loading={loading && model.id === selectedModel}
                />
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {detailModel && (
          <ModelDetailModal
            model={detailModel}
            isOpen={!!detailModel}
            onClose={() => setDetailModel(null)}
            onSetDefault={onSetDefault}
          />
        )}
      </div>
    );
  }

  // List variant
  return (
    <div className={`space-y-2 ${className}`} role="listbox">
      {models.map((model) => (
        <ModelListItem
          key={model.id}
          model={model}
          isSelected={model.id === selectedModel}
          onSelect={() => onModelSelect(model.id)}
          onShowDetails={() => setDetailModel(model)}
          loading={loading && model.id === selectedModel}
        />
      ))}

      {/* Detail Modal */}
      {detailModel && (
        <ModelDetailModal
          model={detailModel}
          isOpen={!!detailModel}
          onClose={() => setDetailModel(null)}
          onSetDefault={onSetDefault}
        />
      )}
    </div>
  );
};
