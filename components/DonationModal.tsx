
import React, { useState } from 'react';
import { DANA_PHONE_NUMBER, SOCIABUZZ_LINK } from '../constants';
import { DocumentDuplicateIcon, XMarkIcon, LinkIcon } from './icons/HeroIcons';

interface DonationModalProps {
    onClose: () => void;
    onDonationSent: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose, onDonationSent }) => {
    const [copied, setCopied] = useState(false);
    const [donationMethod, setDonationMethod] = useState<'DANA' | 'SOCIABUZZ'>('DANA');

    const handleCopy = () => {
        navigator.clipboard.writeText(DANA_PHONE_NUMBER);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const MethodButton: React.FC<{ method: 'DANA' | 'SOCIABUZZ', children: React.ReactNode }> = ({ method, children }) => {
        const isActive = donationMethod === method;
        return (
            <button
                onClick={() => setDonationMethod(method)}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive ? 'bg-brand-primary text-white' : 'bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-dark-bg'
                }`}
            >
                {children}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8 m-4 w-full max-w-md relative animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-medium-light-text dark:text-medium-text hover:text-dark-text dark:hover:text-light-text transition-colors">
                    <XMarkIcon />
                </button>
                <h2 className="text-2xl font-bold text-center mb-4">Support Us</h2>
                <p className="text-center text-medium-light-text dark:text-medium-text mb-6">Choose your preferred donation method below.</p>
                
                <div className="flex space-x-2 bg-light-bg dark:bg-dark-bg p-1 rounded-lg mb-6">
                    <MethodButton method="DANA">DANA</MethodButton>
                    <MethodButton method="SOCIABUZZ">Sociabuzz</MethodButton>
                </div>

                {donationMethod === 'DANA' && (
                    <div className="animate-fade-in">
                        <p className="text-center text-medium-light-text dark:text-medium-text mb-4">Scan the QR code or copy the number.</p>
                        <div className="bg-light-border dark:bg-dark-border p-4 rounded-lg flex items-center justify-between mb-4">
                            <span className="font-mono text-lg">{DANA_PHONE_NUMBER}</span>
                            <button onClick={handleCopy} className="flex items-center text-sm bg-brand-primary px-3 py-1 rounded-md hover:bg-brand-secondary transition-colors text-white">
                                <DocumentDuplicateIcon className="h-4 w-4 mr-1"/>
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="flex justify-center mb-6">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${DANA_PHONE_NUMBER}`} alt="DANA QR Code" className="rounded-lg border-4 border-light-border dark:border-dark-border" />
                        </div>
                    </div>
                )}

                {donationMethod === 'SOCIABUZZ' && (
                     <div className="animate-fade-in text-center">
                         <p className="text-center text-medium-light-text dark:text-medium-text mb-4">Click the button below to open our Sociabuzz page.</p>
                         <a 
                            href={SOCIABUZZ_LINK} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-colors mb-6 shadow-lg transform hover:scale-105"
                         >
                            <LinkIcon className="h-5 w-5 mr-2" />
                            Go to Sociabuzz
                         </a>
                    </div>
                )}

                <p className="text-center text-xs text-medium-light-text dark:text-medium-text mb-4">For demo purposes, click the button below to simulate sending a donation.</p>

                <button 
                    onClick={onDonationSent}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-full hover:scale-105 transform transition-all duration-300"
                >
                    I Have Sent a Donation (Demo)
                </button>
            </div>
        </div>
    );
};

export default DonationModal;