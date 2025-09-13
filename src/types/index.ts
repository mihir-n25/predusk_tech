export interface Model {
    id: string;
    name: string;
    provider: string;
    description: string;
    maxTokens: number;
  }
  
  export interface Template {
    id: string;
    name: string;
    content: string;
    category: string;
  }
  
  export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }
  
  export interface Parameters {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
  }
  
  export interface AppState {
    selectedModel: Model | null;
    parameters: Parameters;
    templates: Template[];
    messages: ChatMessage[];
    theme: 'light' | 'dark';
    isLoading: boolean;
    error: string | null;
  }
  
  export type Theme = 'light' | 'dark';
  
  export interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    description?: string;
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
  }
  
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }