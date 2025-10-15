
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Language, TranslationHistoryItem } from '../types';
import { translateText, generateTextToSpeech } from '../services/geminiService';
import { ArrowsRightLeftIcon, DocumentDuplicateIcon, SpeakerWaveIcon, TrashIcon, ClockIcon } from './icons/HeroIcons';
import Spinner from './Spinner';
import LanguageSelector from './LanguageSelector';
import { LANGUAGE_OPTIONS } from '../constants';

const decode = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
};

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const Translator: React.FC = () => {
    const [fromLang, setFromLang] = useState<Language>(Language.INDONESIAN);
    const [toLang, setToLang] = useState<Language>(Language.BAKUMPAI);
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSpeaking, setIsSpeaking] = useState<'input' | 'output' | null>(null);
    const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    
    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('translationHistory');
            setHistory(storedHistory ? JSON.parse(storedHistory) : []);
        } catch (e) {
            setHistory([]);
        }
    }, []);

    const addToHistory = (item: Omit<TranslationHistoryItem, 'id' | 'date'>) => {
        setHistory(prev => {
            const newHistory = [
                { ...item, id: `hist-${Date.now()}`, date: new Date().toISOString() }, 
                ...prev
            ].slice(0, 20); // Keep last 20 translations
            localStorage.setItem('translationHistory', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const handleTranslate = useCallback(async () => {
        if (!inputText.trim()) {
            setOutputText('');
            return;
        }
        setIsLoading(true);
        setError(null);
        setOutputText('');

        try {
            const result = await translateText(inputText, fromLang, toLang);
            setOutputText(result);
            addToHistory({ from: fromLang, to: toLang, inputText, outputText: result });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [inputText, fromLang, toLang]);

    const handleSwapLanguages = useCallback(() => {
        setFromLang(toLang);
        setToLang(fromLang);
        setInputText(outputText);
        setOutputText(inputText);
    }, [fromLang, toLang, inputText, outputText]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handleTextToSpeech = async (text: string, type: 'input' | 'output') => {
        if (!text || isSpeaking) return;

        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            } catch (e) {
                console.error("Could not create AudioContext:", e);
                setError("Audio playback is not supported on this browser.");
                return;
            }
        }
        
        const audioContext = audioContextRef.current;
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        setIsSpeaking(type);
        try {
            const base64Audio = await generateTextToSpeech(text);
            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioContext, 24000, 1);
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0);
            source.onended = () => setIsSpeaking(null);
        } catch (e) {
            console.error("TTS Error:", e);
            setError("Failed to play audio.");
            setIsSpeaking(null);
        }
    };
    
    const useHistoryItem = (item: TranslationHistoryItem) => {
        setFromLang(item.from);
        setToLang(item.to);
        setInputText(item.inputText);
        setOutputText(item.outputText);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('translationHistory');
    }

    useEffect(() => {
        if (fromLang === toLang) {
            const otherLang = LANGUAGE_OPTIONS.find(l => l !== fromLang) || Language.INDONESIAN;
            setToLang(otherLang);
        }
    }, [fromLang, toLang]);

    return (
        <div className="animate-slide-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-center mb-6">
                    <div className="md:col-span-2">
                        <LanguageSelector selectedLanguage={fromLang} onLanguageChange={setFromLang} id="from-lang"/>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleSwapLanguages} className="p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-transform duration-300 hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-brand-primary">
                            <ArrowsRightLeftIcon />
                        </button>
                    </div>
                     <div className="md:col-span-2">
                        <LanguageSelector selectedLanguage={toLang} onLanguageChange={setToLang} id="to-lang"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="relative">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={`Enter text in ${fromLang}...`}
                            className="w-full h-64 p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-300"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                            <span className="text-xs text-medium-light-text dark:text-medium-text">{inputText.length} / 5000</span>
                            <button onClick={() => handleTextToSpeech(inputText, 'input')} disabled={!inputText || !!isSpeaking} className="p-2 rounded-full bg-dark-border/10 dark:bg-dark-border/50 hover:bg-dark-border/20 dark:hover:bg-dark-border transition-colors disabled:opacity-50">
                                {isSpeaking === 'input' ? <Spinner /> : <SpeakerWaveIcon />}
                            </button>
                            <button onClick={() => copyToClipboard(inputText)} className="p-2 rounded-full bg-dark-border/10 dark:bg-dark-border/50 hover:bg-dark-border/20 dark:hover:bg-dark-border transition-colors">
                                <DocumentDuplicateIcon />
                            </button>
                        </div>
                    </div>
                     <div className="relative bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-4 h-64 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner />
                            </div>
                        ) : error ? (
                            <div className="text-red-500 dark:text-red-400">{error}</div>
                        ) : (
                            <p className="whitespace-pre-wrap">{outputText}</p>
                        )}
                        {!isLoading && outputText && (
                             <div className="absolute bottom-3 right-3 flex space-x-2">
                                <button onClick={() => handleTextToSpeech(outputText, 'output')} disabled={!outputText || !!isSpeaking} className="p-2 rounded-full bg-dark-border/10 dark:bg-dark-border/50 hover:bg-dark-border/20 dark:hover:bg-dark-border transition-colors disabled:opacity-50">
                                    {isSpeaking === 'output' ? <Spinner /> : <SpeakerWaveIcon />}
                                </button>
                                <button onClick={() => copyToClipboard(outputText)} className="p-2 rounded-full bg-dark-border/10 dark:bg-dark-border/50 hover:bg-dark-border/20 dark:hover:bg-dark-border transition-colors">
                                    <DocumentDuplicateIcon />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button 
                        onClick={handleTranslate} 
                        disabled={isLoading}
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-10 rounded-full hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {isLoading ? 'Translating...' : 'Translate'}
                    </button>
                </div>
            </div>
             <div className="lg:col-span-1 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <ClockIcon />
                        <h3 className="text-lg font-semibold ml-2">History</h3>
                    </div>
                    <button onClick={clearHistory} className="text-sm text-red-500 hover:underline disabled:opacity-50" disabled={history.length === 0}>
                        Clear
                    </button>
                </div>
                <ul className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
                    {history.length > 0 ? history.map((item) => (
                        <li key={item.id} onClick={() => useHistoryItem(item)} className="cursor-pointer bg-light-bg dark:bg-dark-bg p-3 rounded-md hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                            <p className="font-semibold text-sm truncate">{item.inputText}</p>
                            <p className="text-xs text-medium-light-text dark:text-medium-text">{item.from} → {item.to}</p>
                        </li>
                    )) : <p className="text-medium-light-text dark:text-medium-text text-sm text-center mt-4">Your translation history will appear here.</p>}
                </ul>
            </div>
        </div>
    );
};

export default Translator;
