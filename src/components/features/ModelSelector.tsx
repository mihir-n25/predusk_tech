import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Zap, Brain, Sparkles, Clock, Settings, Star } from 'lucide-react';

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
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-r-full"></div>
      )}

      <div className={`
        absolute inset-0 rounded-xl transition-all duration-200
        ${isSelected ? 'ring-2 ring-purple-400/50 ring-offset-2 ring-offset-gray-900' : ''}
      `}></div>

      <div className="flex items-center flex-1 gap-3 ml-2">
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
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
        tabIndex={-1}
      >
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
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-6">
          {(model.maxTokens || model.price) && (
            <div className="flex gap-3">
              {model.maxTokens && (
                <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Context Length</p>
                  <p className="text-white font-medium">{model.maxTokens}</p>
                </div>
              )}
              {model.price && (
                <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Price</p>
                  <p className="text-white font-medium">{model.price}</p>
                </div>
              )}
            </div>
          )}

          {model.features && model.features.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {model.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800/50 rounded-md p-2">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {model.samplePrompts && model.samplePrompts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Try asking...</h3>
              <div className="space-y-2">
                {model.samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-sm text-gray-200"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {onSetDefault && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={() => onSetDefault(model.id)}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              <Star className="w-4 h-4" />
              Set as default model
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

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
  const [selectedDetailModel, setSelectedDetailModel] = useState<ModelData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedModelData = models.find(m => m.id === selectedModel) || models[0];

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full px-4 py-2.5 text-left bg-gray-800/50 border border-white/10 rounded-xl hover:bg-gray-700/50 transition-colors ${isOpen ? 'ring-2 ring-purple-500/50' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <img
              src={selectedModelData.avatar}
              alt={`${selectedModelData.name} avatar`}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">
              {selectedModelData.name}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => {
                    onModelSelect(model.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${selectedModel === model.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <img
                    src={model.avatar}
                    alt={`${model.name} avatar`}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{model.name}</p>
                    <p className="text-xs text-gray-400">{model.descriptor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {models.map((model) => (
        <ModelListItem
          key={model.id}
          model={model}
          isSelected={selectedModel === model.id}
          onSelect={() => onModelSelect(model.id)}
          onShowDetails={() => setSelectedDetailModel(model)}
          loading={loading && selectedModel === model.id}
        />
      ))}

      {selectedDetailModel && (
        <ModelDetailModal
          model={selectedDetailModel}
          isOpen={!!selectedDetailModel}
          onClose={() => setSelectedDetailModel(null)}
          onSetDefault={onSetDefault}
        />
      )}
    </div>
  );
};
