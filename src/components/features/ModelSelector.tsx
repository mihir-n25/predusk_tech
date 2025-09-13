import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Zap, Brain, Star, X, ExternalLink, Check } from 'lucide-react';

// Types
interface Model {
  id: string;
  name: string;
  description: string;
  avatar: string;
  maxTokens?: string;
  price?: string;
  tier: 'free' | 'pro' | 'premium';
  isNew?: boolean;
  disabled?: boolean;
  category: 'text' | 'code' | 'image' | 'multimodal';
  samplePrompts?: string[];
  features?: string[];
  performance?: {
    speed: number;
    accuracy: number;
    creativity: number;
  };
}

// Sample data
const models: Model[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Most capable model for complex reasoning tasks',
    avatar: '🤖',
    maxTokens: '128k',
    tier: 'premium',
    category: 'text',
    isNew: true,
    samplePrompts: [
      'Analyze this complex dataset and provide insights',
      'Write a comprehensive technical documentation',
      'Help me solve this multi-step problem'
    ],
    features: ['Advanced reasoning', 'Large context window', 'Multi-turn conversations'],
    performance: { speed: 85, accuracy: 98, creativity: 90 }
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Balanced performance for everyday tasks',
    avatar: '🎭',
    price: '$0.003',
    tier: 'pro',
    category: 'text',
    samplePrompts: [
      'Help me write a professional email',
      'Explain this concept in simple terms',
      'Review and improve my writing'
    ],
    features: ['Natural conversations', 'Ethical reasoning', 'Creative writing'],
    performance: { speed: 90, accuracy: 94, creativity: 88 }
  },
  {
    id: 'codex',
    name: 'GitHub Copilot',
    description: 'Specialized for code generation and debugging',
    avatar: '💻',
    maxTokens: '8k',
    tier: 'pro',
    category: 'code',
    samplePrompts: [
      'Generate a React component with TypeScript',
      'Debug this Python function',
      'Optimize this SQL query'
    ],
    features: ['Code completion', 'Bug detection', 'Multiple languages'],
    performance: { speed: 95, accuracy: 92, creativity: 75 }
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    description: 'Advanced image generation from text prompts',
    avatar: '🎨',
    price: '$0.04',
    tier: 'premium',
    category: 'image',
    samplePrompts: [
      'Create a photorealistic landscape painting',
      'Design a modern logo for a tech company',
      'Generate concept art for a sci-fi scene'
    ],
    features: ['High resolution', 'Style control', 'Safety filtering'],
    performance: { speed: 70, accuracy: 88, creativity: 95 }
  },
  {
    id: 'gpt-3.5',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for general tasks',
    avatar: '⚡',
    maxTokens: '16k',
    tier: 'free',
    category: 'text',
    samplePrompts: [
      'Summarize this article',
      'Generate ideas for my project',
      'Help with basic math problems'
    ],
    features: ['Quick responses', 'General knowledge', 'Cost effective'],
    performance: { speed: 98, accuracy: 85, creativity: 80 }
  },
  {
    id: 'upcoming-model',
    name: 'GPT-5 Preview',
    description: 'Next generation AI model (coming soon)',
    avatar: '🚀',
    maxTokens: '200k',
    tier: 'premium',
    category: 'multimodal',
    disabled: true,
    features: ['Multimodal input', 'Enhanced reasoning', 'Real-time processing'],
    performance: { speed: 80, accuracy: 99, creativity: 95 }
  }
];

// Icons as SVG components
const ModelIcons = {
  Text: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21L19 21H5L3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 7L1 3H5L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Image: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Multimodal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

// Utility functions
const getTierColor = (tier: string) => {
  switch (tier) {
    case 'free': return 'text-green-400';
    case 'pro': return 'text-blue-400';
    case 'premium': return 'text-purple-400';
    default: return 'text-gray-400';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'text': return ModelIcons.Text;
    case 'code': return ModelIcons.Code;
    case 'image': return ModelIcons.Image;
    case 'multimodal': return ModelIcons.Multimodal;
    default: return ModelIcons.Text;
  }
};

// Loading shimmer component
const LoadingSkeleton = () => (
  <div className="flex items-center p-3 space-x-3">
    <div className="w-9 h-9 bg-white/5 rounded-full animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-white/5 rounded animate-pulse w-24" />
      <div className="h-3 bg-white/5 rounded animate-pulse w-32" />
    </div>
    <div className="w-12 h-5 bg-white/5 rounded-full animate-pulse" />
  </div>
);

// Model List Item Component
interface ModelListItemProps {
  model: Model;
  selected?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onDetailClick?: () => void;
}

const ModelListItem: React.FC<ModelListItemProps> = ({ 
  model, 
  selected = false, 
  loading = false,
  onClick,
  onDetailClick 
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  const CategoryIcon = getCategoryIcon(model.category);

  return (
    <div 
      className={`
        relative flex items-center p-3 h-14 cursor-pointer transition-all duration-200 group
        ${selected 
          ? 'bg-white/[0.08] backdrop-blur-sm border-l-4 border-l-gradient-to-b from-purple-500 to-cyan-400' 
          : 'hover:bg-white/[0.04] backdrop-blur-sm'
        }
        ${model.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${selected ? 'shadow-lg shadow-purple-500/10' : ''}
        focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-0
        rounded-lg border border-white/[0.08]
      `}
      onClick={model.disabled ? undefined : onClick}
      role="button"
      tabIndex={model.disabled ? -1 : 0}
      aria-selected={selected}
      aria-disabled={model.disabled}
    >
      {/* Selection gradient bar */}
      {selected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-cyan-400 rounded-r" />
      )}
      
      {/* Avatar */}
      <div className={`
        relative flex items-center justify-center w-9 h-9 rounded-full text-lg
        ${selected ? 'ring-2 ring-purple-400/50' : ''}
        bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm
      `}>
        {model.avatar}
        {model.isNew && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white text-sm truncate">
            {model.name}
          </h3>
          <CategoryIcon />
          {model.isNew && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
              New
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate mt-0.5">
          {model.description}
        </p>
      </div>

      {/* Right side - Pills and actions */}
      <div className="flex items-center gap-2 ml-3">
        {/* Token/Price pill */}
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm
          ${getTierColor(model.tier)} bg-white/5 border border-white/10
        `}>
          {model.maxTokens || model.price || 'Free'}
        </div>
        
        {/* Detail button - appears on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick?.();
          }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/10 transition-all duration-200"
          aria-label="View details"
        >
          <ExternalLink size={14} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

// Dropdown variant
interface ModelDropdownProps {
  models: Model[];
  selected: Model | null;
  onSelect: (model: Model) => void;
  loading?: boolean;
}

const ModelDropdown: React.FC<ModelDropdownProps> = ({
  models,
  selected,
  onSelect,
  loading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-lg hover:bg-white/[0.05] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        disabled={loading}
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <span className="text-lg">{selected.avatar}</span>
            <div>
              <div className="font-medium text-white text-sm">{selected.name}</div>
              <div className="text-xs text-gray-400">{selected.description}</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Select a model...</div>
        )}
        <ChevronDown className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-white/[0.08] rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
          {models.map((model) => (
            <ModelListItem
              key={model.id}
              model={model}
              selected={selected?.id === model.id}
              loading={loading}
              onClick={() => {
                onSelect(model);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Model Detail Modal
interface ModelDetailModalProps {
  model: Model | null;
  isOpen: boolean;
  onClose: () => void;
  onSetDefault?: (model: Model) => void;
}

const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  isOpen,
  onClose,
  onSetDefault
}) => {
  const [isDefaultModel, setIsDefaultModel] = useState(false);

  if (!isOpen || !model) return null;

  const handleSetDefault = () => {
    setIsDefaultModel(true);
    onSetDefault?.(model);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl">
              {model.avatar}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{model.name}</h2>
              <p className="text-gray-400 text-sm">{model.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Performance metrics */}
          {model.performance && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(model.performance).map(([key, value]) => (
                  <div key={key} className="bg-white/[0.03] rounded-lg p-4">
                    <div className="text-sm text-gray-400 capitalize mb-2">{key}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/[0.08] rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-white font-medium text-sm">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {model.features && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 gap-2">
                {model.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-lg">
                    <Check size={16} className="text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Prompts */}
          {model.samplePrompts && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sample Prompts</h3>
              <div className="space-y-2">
                {model.samplePrompts.map((prompt, index) => (
                  <div key={index} className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.08] hover:bg-white/[0.05] cursor-pointer transition-colors">
                    <span className="text-gray-300 text-sm">"{prompt}"</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/[0.08]">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className={getTierColor(model.tier)}>{model.tier.toUpperCase()}</span>
            {model.maxTokens && <span>Max Tokens: {model.maxTokens}</span>}
            {model.price && <span>Price: {model.price}/1k tokens</span>}
          </div>
          
          {!model.disabled && (
            <button
              onClick={handleSetDefault}
              disabled={isDefaultModel}
              className={`
                px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${isDefaultModel 
                  ? 'bg-green-500/20 text-green-400 cursor-default' 
                  : 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500'
                }
              `}
            >
              {isDefaultModel ? (
                <span className="flex items-center gap-2">
                  <Check size={16} />
                  Set as Default
                </span>
              ) : (
                'Set as Default'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Model Selector Component
const ModelSelector: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(models[0]);
  const [viewMode, setViewMode] = useState<'list' | 'dropdown'>('list');
  const [loading, setLoading] = useState(false);
  const [detailModel, setDetailModel] = useState<Model | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleModelSelect = (model: Model) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedModel(model);
      setLoading(false);
    }, 500);
  };

  const handleShowDetail = (model: Model) => {
    setDetailModel(model);
    setShowDetail(true);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles size={20} className="text-purple-400" />
          Select Model
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </button>
          <button
            onClick={() => setViewMode('dropdown')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'dropdown' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Model Selector */}
      {viewMode === 'list' ? (
        <div className="space-y-2">
          {models.map((model) => (
            <ModelListItem
              key={model.id}
              model={model}
              selected={selectedModel?.id === model.id}
              loading={loading && selectedModel?.id === model.id}
              onClick={() => handleModelSelect(model)}
              onDetailClick={() => handleShowDetail(model)}
            />
          ))}
        </div>
      ) : (
        <ModelDropdown
          models={models}
          selected={selectedModel}
          onSelect={handleModelSelect}
          loading={loading}
        />
      )}

      {/* Quick stats */}
      {selectedModel && (
        <div className="mt-6 p-4 bg-white/[0.03] backdrop-blur-sm rounded-lg border border-white/[0.08]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Selected:</span>
            <span className="text-white font-medium">{selectedModel.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-gray-400">Tier:</span>
            <span className={`font-medium ${getTierColor(selectedModel.tier)}`}>
              {selectedModel.tier.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Model Detail Modal */}
      <ModelDetailModal
        model={detailModel}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onSetDefault={(model) => {
          setSelectedModel(model);
          setTimeout(() => setShowDetail(false), 1000);
        }}
      />
    </div>
  );
};

export default ModelSelector;