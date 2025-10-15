
const GEMINI_API_KEY_STORAGE_KEY = 'gemini_api_key';
const GITHUB_API_KEY_STORAGE_KEY = 'github_api_key';

type ApiService = 'gemini' | 'github';

export const setApiKey = (service: ApiService, key: string): void => {
    const storageKey = service === 'gemini' ? GEMINI_API_KEY_STORAGE_KEY : GITHUB_API_KEY_STORAGE_KEY;
    try {
        if (key) {
            localStorage.setItem(storageKey, key);
        } else {
            localStorage.removeItem(storageKey);
        }
    } catch (e) {
        console.error(`Could not save ${service} API key to localStorage.`, e);
    }
};

export const getApiKey = (service: ApiService): string | null => {
    const storageKey = service === 'gemini' ? GEMINI_API_KEY_STORAGE_KEY : GITHUB_API_KEY_STORAGE_KEY;
    try {
        return localStorage.getItem(storageKey);
    } catch (e) {
        console.error(`Could not retrieve ${service} API key from localStorage.`, e);
        return null;
    }
};

export const getAllApiKeys = (): { gemini: string; github: string } => {
    return {
        gemini: getApiKey('gemini') || '',
        github: getApiKey('github') || '',
    };
};
