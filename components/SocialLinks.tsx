
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { InstagramIcon, TelegramIcon, TikTokIcon } from './icons/SocialIcons';

const SocialLinks: React.FC = () => {
    return (
        <div className="flex justify-center space-x-6">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-medium-text hover:text-brand-accent transition-colors duration-300">
                <InstagramIcon className="h-7 w-7" />
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="text-medium-text hover:text-brand-accent transition-colors duration-300">
                <TelegramIcon className="h-7 w-7" />
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-medium-text hover:text-brand-accent transition-colors duration-300">
                <TikTokIcon className="h-7 w-7" />
            </a>
        </div>
    );
};

export default SocialLinks;