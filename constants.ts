import { Language, Donation, Comment } from './types';

export const LANGUAGE_OPTIONS: Language[] = [
    Language.INDONESIAN,
    Language.BAKUMPAI,
    Language.NGAJU,
];

export const DANA_PHONE_NUMBER = '085651479650';
export const SOCIABUZZ_LINK = 'https://sociabuzz.com/your-profile-here'; // Ganti dengan link profil Sociabuzz Anda

export const SOCIAL_LINKS = {
    instagram: 'https://instagram.com',
    telegram: 'https://telegram.org',
    tiktok: 'https://tiktok.com',
};

// Mock data now uses ISO date strings for consistency with localStorage
export const MOCK_DONATIONS: Donation[] = [
    { id: 'mock-d-1', name: 'Budi Santoso', amount: 50000, date: new Date(Date.now() - 86400000).toISOString() },
    { id: 'mock-d-2', name: 'Siti Aminah', amount: 100000, date: new Date(Date.now() - 172800000).toISOString() },
    { id: 'mock-d-3', name: 'Ahmad Yani', amount: 25000, date: new Date(Date.now() - 259200000).toISOString() },
];

export const MOCK_COMMENTS: Comment[] = [
    { 
        id: 'mock-1',
        username: 'Pengguna123', 
        email: 'user@example.com', 
        message: 'Aplikasi ini sangat membantu! Terjemahannya akurat.', 
        rating: 5, 
        date: new Date(Date.now() - 86400000).toISOString(),
        likes: 12,
        replies: []
    },
    { 
        id: 'mock-2',
        username: 'Budayawan', 
        email: 'culture@example.com', 
        message: 'Bagus sekali untuk melestarikan bahasa daerah. Mungkin bisa ditambahkan fitur suara?', 
        rating: 4, 
        date: new Date(Date.now() - 172800000).toISOString(),
        likes: 8,
        replies: [
            {
                id: 'mock-reply-1',
                username: 'Admin',
                email: '',
                message: 'Terima kasih atas sarannya! Fitur suara sedang kami kembangkan.',
                rating: 0,
                date: new Date(Date.now() - 170000000).toISOString(),
                likes: 5,
                replies: []
            }
        ] 
    },
     { 
        id: 'mock-3',
        username: 'John Doe', 
        email: 'john@example.com', 
        message: 'Desainnya modern dan mudah digunakan. Terkadang terjemahan masih perlu perbaikan, tapi secara keseluruhan bagus.', 
        rating: 4, 
        date: new Date(Date.now() - 259200000).toISOString(),
        likes: 3,
        replies: []
    },
];