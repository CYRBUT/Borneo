
import React, { useState, useEffect, useMemo } from 'react';
import { Donation } from '../types';
import { MOCK_DONATIONS } from '../constants';
import DonationModal from './DonationModal';
import { GiftIcon, StarIcon } from './icons/HeroIcons';

const Donations: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        try {
            const storedDonations = localStorage.getItem('donations');
            setDonations(storedDonations ? JSON.parse(storedDonations) : MOCK_DONATIONS);
        } catch (error) {
            setDonations(MOCK_DONATIONS);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('donations', JSON.stringify(donations));
        } catch (error) {
            console.error("Failed to save donations to localStorage", error);
        }
    }, [donations]);

    const { topDonors } = useMemo(() => {
        const sortedDonors = [...donations].sort((a, b) => b.amount - a.amount).slice(0, 3);
        return { topDonors: sortedDonors };
    }, [donations]);

    const handleDonationSent = () => {
        const newDonation: Donation = {
            id: `donation-${Date.now()}`,
            name: 'Anonymous (Demo)',
            amount: Math.floor(Math.random() * (200000 - 10000) + 10000),
            date: new Date().toISOString(),
        };
        setDonations(prev => [newDonation, ...prev]);
        setIsModalOpen(false);
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="max-w-4xl mx-auto animate-slide-in-up">
            <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-brand-primary mb-2">Support Our Mission</h2>
                    <p className="text-medium-light-text dark:text-medium-text">
                        Your contribution helps us preserve and promote the beautiful languages of Borneo for future generations.
                    </p>
                </div>

                <div className="text-center mb-8">
                     <button 
                        onClick={() => setIsModalOpen(true)} 
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-10 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg"
                    >
                        Donate Now
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Donation History */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center"><GiftIcon /> <span className="ml-2">Recent Donations</span></h3>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                            {donations.map((d) => (
                                <div key={d.id} className="flex justify-between items-center bg-light-bg dark:bg-dark-border/50 p-3 rounded-lg text-sm animate-fade-in">
                                    <div>
                                        <span className="font-semibold">{d.name}</span>
                                        <p className="text-xs text-medium-light-text dark:text-medium-text">{formatDate(d.date)}</p>
                                    </div>
                                    <span className="font-bold text-green-500 text-base">Rp {d.amount.toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                     {/* Top Donors */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center"><StarIcon className="text-yellow-400"/> <span className="ml-2">Top Supporters</span></h3>
                        <div className="space-y-3">
                            {topDonors.map((d, i) => (
                                <div key={d.id} className="flex items-center bg-yellow-400/10 p-3 rounded-lg">
                                    <span className={`font-bold text-lg mr-4 ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : 'text-orange-400'}`}>#{i+1}</span>
                                    <div>
                                        <p className="font-semibold">{d.name}</p>
                                        <p className="font-bold text-sm text-yellow-500">Rp {d.amount.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} onDonationSent={handleDonationSent} />}
        </div>
    );
};

export default Donations;