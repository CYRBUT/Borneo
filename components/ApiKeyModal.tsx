
import React, { useState, useEffect } from 'react';
import { setApiConfig, getApiConfig, ApiConfig } from '../services/apiKeyService';
import { reinitializeAi } from '../services/geminiService';
import { XMarkIcon, KeyIcon } from './icons/HeroIcons';
import { GitHubIcon } from './icons/SocialIcons';

interface ApiKeyModalProps {
    onClose: () => void;
    onKeySaved: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose, onKeySaved }) => {
    const [config, setConfig] = useState<ApiConfig>({ selectedProvider: 'gemini', gemini: '', github: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedConfig = getApiConfig();
        setConfig(savedConfig);
    }, []);

    const handleProviderChange = (provider: 'gemini' | 'github') => {
        setConfig(prev => ({ ...prev, selectedProvider: provider }));
        setError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (config.selectedProvider === 'gemini' && !config.gemini?.trim()) {
            setError('Gemini API Key is required for core functionality.');
            return;
        }

        const configToSave: Partial<ApiConfig> = {
            selectedProvider: config.selectedProvider,
            gemini: config.gemini?.trim() || null,
            github: config.github?.trim() || null,
        };
        
        setApiConfig(configToSave);
        reinitializeAi();
        onKeySaved();
    };
    
    const ProviderButton = ({ provider, label, icon }: { provider: 'gemini' | 'github', label: string, icon: React.ReactNode }) => {
        const isSelected = config.selectedProvider === provider;
        return (
            <button
                type="button"
                onClick={() => handleProviderChange(provider)}
                className={`flex-1 p-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                    isSelected ? 'bg-brand-primary text-white shadow-md' : 'bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border'
                }`}
            >
                {icon}
                <span className="font-semibold">{label}</span>
            </button>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8 m-4 w-full max-w-lg relative animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-medium-light-text dark:text-medium-text hover:text-dark-text dark:hover:text-light-text transition-colors">
                    <XMarkIcon />
                </button>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Manage API Keys</h2>
                    <p className="text-medium-light-text dark:text-medium-text">
                        Your keys are stored securely in your browser's local storage.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold mb-2 text-center">
                            Choose API Provider
                        </label>
                        <div className="flex space-x-2 bg-light-border dark:bg-dark-border p-1 rounded-xl">
                            <ProviderButton provider="gemini" label="Gemini" icon={<KeyIcon />} />
                            <ProviderButton provider="github" label="GitHub" icon={<GitHubIcon />} />
                        </div>
                    </div>

                    {config.selectedProvider === 'gemini' && (
                        <div className="animate-fade-in">
                            <label className="flex items-center text-lg font-semibold mb-2">
                                <KeyIcon className="h-6 w-6 mr-2 text-brand-primary" />
                                <span>Gemini API Key (Required)</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter your Gemini API Key..." 
                                value={config.gemini || ''} 
                                onChange={e => setConfig(prev => ({ ...prev, gemini: e.target.value }))}
                                className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" 
                                required 
                            />
                            <p className="text-xs text-right mt-1 text-medium-light-text dark:text-medium-text">
                                Get a key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Google AI Studio</a>.
                            </p>
                        </div>
                    )}
                    
                    {config.selectedProvider === 'github' && (
                         <div className="animate-fade-in">
                            <label className="flex items-center text-lg font-semibold mb-2">
                                <GitHubIcon className="h-6 w-6 mr-2" />
                                <span>GitHub Personal Access Token</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter your GitHub PAT..." 
                                value={config.github || ''} 
                                onChange={e => setConfig(prev => ({ ...prev, github: e.target.value }))}
                                className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" 
                            />
                             <p className="text-xs text-right mt-1 text-medium-light-text dark:text-medium-text">
                                Used for managing the custom dictionary from a GitHub repository.
                            </p>
                        </div>
                    )}

                    {error && <p className="text-red-500 dark:text-red-400 text-sm text-center -my-2">{error}</p>}
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-full hover:scale-105 transform transition-all duration-300"
                    >
                        Save Configuration
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;