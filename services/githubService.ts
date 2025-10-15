import { getApiConfig } from './apiKeyService';
import { Dictionary } from '../types';

// --- IMPORTANT: Configuration ---
// Replace these placeholders with your actual GitHub repository details.
const GITHUB_REPO_OWNER = 'bangindra123';
const GITHUB_REPO_NAME = 'borneo-ai-dictionary';
const DICTIONARY_FILE_PATH = 'dictionary.json';
// --------------------------------

const getGithubToken = (): string | null => {
    return getApiConfig().github;
};

const getApiUrl = () => {
    return `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${DICTIONARY_FILE_PATH}`;
};

// Fetches the dictionary file content and its SHA hash from GitHub.
// The SHA is required for subsequent updates.
export const getDictionaryWithSha = async (): Promise<{ dictionary: Dictionary, sha: string | null }> => {
    const token = getGithubToken();
    if (!token) {
        throw new Error('GitHub token not configured.');
    }

    try {
        const response = await fetch(getApiUrl(), {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (response.status === 404) {
            console.log('Dictionary file not found on GitHub. A new one will be created.');
            return { dictionary: {}, sha: null };
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        const content = atob(data.content);
        const dictionary = JSON.parse(content) as Dictionary;
        
        return { dictionary, sha: data.sha };
    } catch (error) {
        console.error('Error fetching from GitHub:', error);
        throw error;
    }
};

// A simpler version for consumers that only need the dictionary content.
export const getDictionary = async (): Promise<Dictionary> => {
    const { dictionary } = await getDictionaryWithSha();
    return dictionary;
}

// Creates or updates the dictionary file on GitHub.
export const updateDictionary = async (dictionary: Dictionary, sha: string | null): Promise<void> => {
    const token = getGithubToken();
    if (!token) {
        throw new Error('GitHub token not configured.');
    }

    const content = JSON.stringify(dictionary, null, 2);
    const encodedContent = btoa(content);

    const body: { message: string; content: string; sha?: string } = {
        message: `[Admin Panel] Update custom dictionary ${new Date().toISOString()}`,
        content: encodedContent,
    };

    if (sha) {
        body.sha = sha;
    }

    const response = await fetch(getApiUrl(), {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message || response.statusText}`);
    }

    console.log('Dictionary successfully updated on GitHub.');
};