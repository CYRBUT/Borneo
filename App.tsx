import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Translator from './components/Translator';
import AdminPanel from './components/AdminPanel';
import Comments from './components/Comments';
import Donations from './components/Donations';
import LoginModal from './components/LoginModal';
import SocialLinks from './components/SocialLinks';
import Learn from './components/Learn';
import ApiKeyModal from './components/ApiKeyModal';
import { getApiKey } from './services/geminiService';
import { View, UserRole } from './types';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.TRANSLATOR);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check for API key on initial load
    if (!getApiKey()) {
      setIsApiKeyModalOpen(true);
    }

    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  const handleLoginSuccess = () => {
    setUserRole(UserRole.ADMIN);
    setIsLoginModalOpen(false);
    setCurrentView(View.ADMIN);
  };

  const handleLogout = () => {
    setUserRole(UserRole.GUEST);
    setCurrentView(View.TRANSLATOR);
  };

  const handleAuthClick = () => {
    if (userRole === UserRole.ADMIN) {
      setCurrentView(View.ADMIN);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleApiKeySaved = () => {
    setIsApiKeyModalOpen(false);
    // You might want to refresh the current view or show a success message
    // For now, just closing the modal is enough as the service is re-initialized.
  };

  const renderView = useCallback(() => {
    switch (currentView) {
      case View.ADMIN:
        return userRole === UserRole.ADMIN ? <AdminPanel onLogout={handleLogout} /> : <Translator />;
      case View.COMMENTS:
        return <Comments userRole={userRole} />;
      case View.DONATIONS:
        return <Donations />;
      case View.LEARN:
        return <Learn userRole={userRole} />;
      case View.TRANSLATOR:
      default:
        return <Translator />;
    }
  }, [currentView, userRole]);

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onAdminClick={handleAuthClick}
        onApiKeyClick={() => setIsApiKeyModalOpen(true)}
        userRole={userRole}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderView()}
      </main>
      <footer className="text-center py-6 text-medium-light-text dark:text-medium-text text-sm flex flex-col items-center gap-4">
        <SocialLinks />
        <p>Borneo &copy; 2024. Powered by Gemini.</p>
      </footer>
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      {isApiKeyModalOpen && <ApiKeyModal onClose={() => setIsApiKeyModalOpen(false)} onKeySaved={handleApiKeySaved} />}
    </div>
  );
};

export default App;