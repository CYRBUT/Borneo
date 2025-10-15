
import React from 'react';
import { Language } from '../types';
import { LANGUAGE_OPTIONS } from '../constants';

interface LanguageSelectorProps {
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
    id: string;
    label?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, id, label }) => (
    <div>
        {label && <label htmlFor={id} className="block text-sm font-medium text-medium-light-text dark:text-medium-text mb-1">{label}</label>}
        <div className="relative">
            <select
                id={id}
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="w-full appearance-none bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg py-2 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-300"
            >
                {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-medium-light-text dark:text-medium-text">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);

export default LanguageSelector;