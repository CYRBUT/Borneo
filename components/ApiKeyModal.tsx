
import React, { useState, useEffect } from 'react';
import { setApiKey, getAllApiKeys } from '../services/apiKeyService';
import { reinitializeAi } from '../services/geminiService';
import { XMarkIcon, KeyIcon } from './icons/HeroIcons';
import { GitHubIcon } from './icons/SocialIcons';

interface ApiKeyModalProps {
    onClose: () => void;
    onKeySaved: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose, onKeySaved }) => {
    const [keys, setKeys] = useState({ gemini: '', github: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setKeys(getAllApiKeys());
    }, []);

    const handleInputChange = (service: 'gemini' | 'github', value: string) => {
        setKeys(prev => ({ ...prev, [service]: value }));
        if (service === 'gemini' && error) {
            setError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keys.gemini.trim()) {
            setError('Gemini API Key is required for core functionality.');
            return;
        }
        setError(null);
        setApiKey('gemini', keys.gemini.trim());
        setApiKey('github', keys.github.trim());
        reinitializeAi(); // Re-initialize the Gemini client with the new key
        onKeySaved();
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
                        Your keys are stored securely in your browser's local storage and are never sent anywhere else.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Gemini API Key Section */}
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2">
                            <KeyIcon className="h-6 w-6 mr-2 text-brand-primary" />
                            <span>Gemini API Key</span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter your Gemini API Key..." 
                            value={keys.gemini} 
                            onChange={e => handleInputChange('gemini', e.target.value)} 
                            className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" 
                            required 
                        />
                        <p className="text-xs text-right mt-1 text-medium-light-text dark:text-medium-text">
                            Get a key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Google AI Studio</a>.
                        </p>
                    </div>

                    {/* GitHub API Key Section */}
                    <div>
                        <label className="flex items-center text-lg font-semibold mb-2">
                            <GitHubIcon className="h-6 w-6 mr-2" />
                            <span>GitHub API Key (Optional)</span>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter your GitHub Personal Access Token..." 
                            value={keys.github} 
                            onChange={e => handleInputChange('github', e.target.value)} 
                            className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                         <p className="text-xs text-right mt-1 text-medium-light-text dark:text-medium-text">
                            Create a <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Personal Access Token</a>.
                        </p>
                    </div>

                    {error && <p className="text-red-500 dark:text-red-400 text-sm text-center -my-2">{error}</p>}
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-full hover:scale-105 transform transition-all duration-300"
                    >
                        Save Keys
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;
