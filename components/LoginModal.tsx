
import React, { useState } from 'react';
import { XMarkIcon } from './icons/HeroIcons';

interface LoginModalProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const ADMIN_EMAIL = 'bangindrabang123@gmail.com';
const ADMIN_PASSWORD = '02162003';

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const playAlertSound = () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (!audioContext) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            console.error("Could not play alert sound:", e);
        }
    };

    const sendFailedLoginNotification = (emailAttempt: string) => {
        console.warn(`
            --- SECURITY ALERT ---
            A failed login attempt to the admin panel was detected.
            Email used: ${emailAttempt}
            Timestamp: ${new Date().toISOString()}
            *In a real application, an email notification would be sent to ${ADMIN_EMAIL}.*
        `);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            onLoginSuccess();
        } else {
            setError('Invalid email or password.');
            playAlertSound();
            sendFailedLoginNotification(email);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8 m-4 w-full max-w-md relative animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-medium-light-text dark:text-medium-text hover:text-dark-text dark:hover:text-light-text transition-colors">
                    <XMarkIcon />
                </button>
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        className="w-full p-3 bg-light-border dark:bg-dark-border rounded focus:outline-none focus:ring-2 focus:ring-brand-primary" 
                        required 
                    />
                    {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-4 rounded-full hover:scale-105 transform transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;