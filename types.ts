export enum Language {
    INDONESIAN = 'Indonesian',
    BAKUMPAI = 'Bakumpai',
    NGAJU = 'Ngaju',
}

export enum View {
    TRANSLATOR,
    ADMIN,
    COMMENTS,
    DONATIONS,
    LEARN,
}

export enum UserRole {
    GUEST,
    ADMIN,
}

export interface Donation {
    id: string;
    name: string;
    amount: number;
    date: string;
}

export interface Comment {
    id: string;
    username: string;
    email: string;
    message: string;
    rating: number;
    date: string;
    likes: number;
    replies: Comment[];
}

export interface RatingSummary {
    average: number;
    total: number;
    counts: {
        '5': number;
        '4': number;
        '3': number;
        '2': number;
        '1': number;
    };
}

export interface UploadHistoryItem {
    fileName: string;
    from: Language;
    to: Language;
    date: string;
}

export interface TranslationHistoryItem {
    id: string;
    from: Language;
    to: Language;
    inputText: string;
    outputText: string;
    date: string;
}

export interface CulturalPost {
    id: string;
    imageUrl: string; // Base64 encoded image
    text: string;
    date: string;
}
