
import React from 'react';
import { View, UserRole } from '../types';
import { TranslateIcon, UserCircleIcon, ChatBubbleLeftRightIcon, GiftIcon, LoginIcon, SparklesIcon, SunIcon, MoonIcon, KeyIcon } from './icons/HeroIcons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onAdminClick: () => void;
  onApiKeyClick: () => void;
  userRole: UserRole;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
        <img 
            src="https://i.imgur.com/gEo53n0.png" 
            alt="Borneo Logo" 
            className="h-10 w-10 rounded-full"
        />
        <div className="flex items-baseline text-xl font-bold text-dark-text dark:text-light-text">
            <span
                className="overflow-hidden whitespace-nowrap border-r-2 border-r-transparent animate-typing"
            >
                Borneo
            </span>
        </div>
    </div>
);

const NavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium";
  const activeClasses = "bg-brand-primary text-white shadow-lg";
  const inactiveClasses = "bg-light-card dark:bg-dark-card hover:bg-light-border dark:hover:bg-dark-border";
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onAdminClick, onApiKeyClick, userRole, theme, toggleTheme }) => {
  const isAdmin = userRole === UserRole.ADMIN;

  return (
    <header className="bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-md dark:shadow-black/20">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-1 sm:space-x-2">
          <NavButton 
            label="Translator" 
            icon={<TranslateIcon />}
            isActive={currentView === View.TRANSLATOR}
            onClick={() => setCurrentView(View.TRANSLATOR)}
          />
           <NavButton 
            label="Learn" 
            icon={<SparklesIcon />}
            isActive={currentView === View.LEARN}
            onClick={() => setCurrentView(View.LEARN)}
          />
          <NavButton 
            label="Comment" 
            icon={<ChatBubbleLeftRightIcon />}
            isActive={currentView === View.COMMENTS}
            onClick={() => setCurrentView(View.COMMENTS)}
          />
           <NavButton 
            label="Donations" 
            icon={<GiftIcon />}
            isActive={currentView === View.DONATIONS}
            onClick={() => setCurrentView(View.DONATIONS)}
          />
          <NavButton 
            label={isAdmin ? "Admin" : "Login"}
            icon={isAdmin ? <UserCircleIcon /> : <LoginIcon />}
            isActive={currentView === View.ADMIN}
            onClick={onAdminClick}
          />
           <button onClick={toggleTheme} className="p-2 rounded-lg transition-colors duration-300 hover:bg-light-border dark:hover:bg-dark-border" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={onApiKeyClick} className="p-2 rounded-lg transition-colors duration-300 hover:bg-light-border dark:hover:bg-dark-border" aria-label="Set API Key">
              <KeyIcon />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;