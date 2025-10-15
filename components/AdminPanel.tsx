
import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Language, UploadHistoryItem, Donation, Comment } from '../types';
import { ArrowUpOnSquareIcon, LogoutIcon, ChartBarIcon, CurrencyDollarIcon } from './icons/HeroIcons';
import { InstagramIcon, TelegramIcon, TikTokIcon } from './icons/SocialIcons';
import LanguageSelector from './LanguageSelector';
import { updateCustomDictionary } from '../services/geminiService';
import { PieChart, LineChart } from './charts';


const ProfileCard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center animate-fade-in">
        <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-24 h-24 rounded-full mb-4 border-4 border-brand-primary" />
        <h2 className="text-xl font-bold">Admin Borneo</h2>
        <p className="text-medium-light-text dark:text-medium-text">Language Enthusiast</p>
        <div className="flex space-x-4 mt-4">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-medium-light-text dark:text-medium-text hover:text-brand-accent transition-colors"><InstagramIcon /></a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="text-medium-light-text dark:text-medium-text hover:text-brand-accent transition-colors"><TelegramIcon /></a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-medium-light-text dark:text-medium-text hover:text-brand-accent transition-colors"><TikTokIcon /></a>
        </div>
        <button
            onClick={onLogout}
            className="w-full mt-6 flex items-center justify-center space-x-2 bg-light-border dark:bg-dark-border hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 dark:text-red-400 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
            <LogoutIcon className="h-5 w-5" />
            <span>Logout</span>
        </button>
    </div>
);

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg animate-slide-in-up">
        <div className="flex items-center mb-4">
            {icon}
            <h3 className="text-lg font-semibold ml-2">{title}</h3>
        </div>
        {children}
    </div>
);

interface AdminPanelProps {
    onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([]);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fromLang, setFromLang] = useState<Language>(Language.INDONESIAN);
    const [toLang, setToLang] = useState<Language>(Language.BAKUMPAI);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('uploadHistory');
            const storedDonations = localStorage.getItem('donations');
            const storedComments = localStorage.getItem('comments');
            setUploadHistory(storedHistory ? JSON.parse(storedHistory) : []);
            setDonations(storedDonations ? JSON.parse(storedDonations) : []);
            setComments(storedComments ? JSON.parse(storedComments) : []);
        } catch (error) {
            console.error("Failed to parse data from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('uploadHistory', JSON.stringify(uploadHistory));
        } catch (error) {
            console.error("Failed to save upload history to localStorage", error);
        }
    }, [uploadHistory]);

    const ratingData = comments.reduce((acc, comment) => {
        const rating = comment.rating;
        const key = `${rating} star`;
        if(!acc[key]) acc[key] = 0;
        acc[key]++;
        return acc;
    }, {} as {[key: string]: number});

    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;
    
            const lines = text.split('\n');
            let updatedCount = 0;
            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 2) {
                    const source = parts[0].trim();
                    // Handle cases where the target might contain commas
                    const target = parts.slice(1).join(',').trim();
                    if (source && target) {
                        updateCustomDictionary(fromLang, toLang, source, target);
                        updatedCount++;
                    }
                }
            });
    
            if (updatedCount > 0) {
                const newHistoryItem: UploadHistoryItem = {
                    fileName: selectedFile.name,
                    from: fromLang,
                    to: toLang,
                    date: new Date().toISOString(),
                };
                setUploadHistory(prev => [newHistoryItem, ...prev]);
                setSuccessMessage(`${updatedCount} phrase(s) added to dictionary.`);
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 3000);
            }
            setSelectedFile(null);
        };
        reader.readAsText(selectedFile);
    };
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <ProfileCard onLogout={onLogout} />
                <Section title="Donation Overview" icon={<CurrencyDollarIcon />}>
                    <p className="text-3xl font-bold text-green-500">Rp {totalDonations.toLocaleString('id-ID')}</p>
                    <p className="text-sm text-medium-light-text dark:text-medium-text">from {donations.length} supporters</p>
                </Section>
            </div>
            <div className="lg:col-span-2 space-y-8">
                 <Section title="Rating Summary" icon={<ChartBarIcon />}>
                    <div className="h-64">
                         <PieChart data={ratingData} />
                    </div>
                </Section>
                <Section title="Improve Dictionary" icon={<ArrowUpOnSquareIcon />}>
                    <p className="text-medium-light-text dark:text-medium-text mb-4 text-sm">Upload a CSV or TXT file with translations to improve accuracy. Format: `source phrase,target phrase` per line.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <LanguageSelector selectedLanguage={fromLang} onLanguageChange={setFromLang} id="upload-from" label="From"/>
                        <LanguageSelector selectedLanguage={toLang} onLanguageChange={setToLang} id="upload-to" label="To"/>
                    </div>
                     <div className="flex items-center space-x-4">
                        <label htmlFor="file-upload" className="flex-1 cursor-pointer bg-light-border dark:bg-dark-border text-center py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-bg transition-colors">
                            {selectedFile ? selectedFile.name : 'Choose File'}
                        </label>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv,.txt" />
                        <button onClick={handleUpload} disabled={!selectedFile || fromLang === toLang} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Upload
                        </button>
                    </div>
                </Section>
                <Section title="Upload History" icon={<ArrowUpOnSquareIcon />}>
                    <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                         {uploadHistory.length > 0 ? uploadHistory.map((item, i) => (
                            <li key={i} className="flex justify-between items-center bg-light-bg dark:bg-dark-border/50 p-2 rounded-md text-sm">
                                <div>
                                    <p className="font-semibold">{item.fileName}</p>
                                    <p className="text-xs text-medium-light-text dark:text-medium-text">{item.from} → {item.to}</p>
                                </div>
                                <span className="text-xs text-medium-light-text dark:text-medium-text">{formatDate(item.date)}</span>
                            </li>
                        )) : <p className="text-medium-light-text dark:text-medium-text text-sm">No files uploaded yet.</p>}
                    </ul>
                </section>
            </div>
            {showSuccessToast && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;