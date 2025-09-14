"use client";

import React, { useState } from 'react';
import { User, Settings, MessageSquare, Clock, Zap, Shield, Moon, Sun, ChevronRight, BarChart3, Globe, Mic, Image, FileText, Code, Brain, HelpCircle } from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = {
    bg: isDarkMode ? 'bg-[#020617]' : 'bg-gray-50',
    cardBg: isDarkMode ? 'bg-[#020617]' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  };

  const capabilities = [
    { icon: MessageSquare, label: 'Text Generation', description: 'Advanced conversational AI' },
    { icon: Code, label: 'Code Assistance', description: 'Programming help & debugging' },
    { icon: FileText, label: 'Document Analysis', description: 'Text processing & summarization' },
    { icon: Image, label: 'Visual Understanding', description: 'Image analysis & description' },
    { icon: Globe, label: 'Web Search', description: 'Real-time information retrieval' },
    { icon: Brain, label: 'Reasoning', description: 'Complex problem solving' },
  ];

  const stats = [
    { label: 'Conversations', value: '2,847' },
    { label: 'Messages', value: '18,293' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Response Time', value: '1.2s' },
  ];

  const menuItems = [
    { icon: Settings, label: 'Preferences', description: 'Customize your experience' },
    { icon: Shield, label: 'Privacy & Security', description: 'Data protection settings' },
    { icon: BarChart3, label: 'Usage Analytics', description: 'View your activity insights' },
    { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance and resources' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg}`}>
   
      <div className="max-w-6xl mx-auto px-6 py-8 my-40">
        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6 mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`font-medium ${themeClasses.text}`}>Online & Ready</span>
            </div>
            <div className={`text-sm ${themeClasses.textMuted}`}>
              <Clock className="w-4 h-4 inline mr-1" />
              Last active: Now
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>{stat.value}</div>
                <div className={`text-sm ${themeClasses.textMuted}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6 mb-8`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}>
            <Zap className="w-5 h-5 mr-2" />
            Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className={`p-4 rounded-lg transition-colors ${themeClasses.hover} ${themeClasses.border} border`}>
                <div className="flex items-start space-x-3">
                  <capability.icon className={`w-5 h-5 mt-0.5 ${themeClasses.textSecondary} flex-shrink-0`} />
                  <div>
                    <h3 className={`font-medium ${themeClasses.text} mb-1`}>{capability.label}</h3>
                    <p className={`text-sm ${themeClasses.textMuted}`}>{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6 mb-8`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Model Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`${themeClasses.textSecondary}`}>Version</span>
              <span className={`${themeClasses.text} font-medium`}>Mirofy Sonnet 4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${themeClasses.textSecondary}`}>Training Data</span>
              <span className={`${themeClasses.text} font-medium`}>Up to Jan 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${themeClasses.textSecondary}`}>Context Window</span>
              <span className={`${themeClasses.text} font-medium`}>200K tokens</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`${themeClasses.textSecondary}`}>Languages Supported</span>
              <span className={`${themeClasses.text} font-medium`}>100+</span>
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} ${themeClasses.border} border rounded-xl p-6`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Settings & Support</h2>
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${themeClasses.hover} text-left`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5 ${themeClasses.textSecondary}`} />
                  <div>
                    <div className={`font-medium ${themeClasses.text}`}>{item.label}</div>
                    <div className={`text-sm ${themeClasses.textMuted}`}>{item.description}</div>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${themeClasses.textMuted}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <p className={`text-sm ${themeClasses.textMuted}`}>
            Built with care by Mihir • Version 2.1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;