const API_CONFIG_KEY = 'api_config';

export interface ApiConfig {
    selectedProvider: 'gemini' | 'github';
    gemini: string | null;
    github: string | null;
}

const DEFAULT_CONFIG: ApiConfig = {
    selectedProvider: 'gemini',
    gemini: null,
    github: null,
};

export const setApiConfig = (config: Partial<ApiConfig>): void => {
    try {
        const currentConfig = getApiConfig();
        const newConfig = { ...currentConfig, ...config };
        localStorage.setItem(API_CONFIG_KEY, JSON.stringify(newConfig));
    } catch (e) {
        console.error(`Could not save API config to localStorage.`, e);
    }
};

export const getApiConfig = (): ApiConfig => {
    try {
        const storedConfig = localStorage.getItem(API_CONFIG_KEY);
        if (storedConfig) {
            const parsed = JSON.parse(storedConfig);
            // Merge with defaults to ensure all keys are present
            return { ...DEFAULT_CONFIG, ...parsed };
        }
        return DEFAULT_CONFIG;
    } catch (e) {
        console.error(`Could not retrieve API config from localStorage.`, e);
        return DEFAULT_CONFIG;
    }
};
