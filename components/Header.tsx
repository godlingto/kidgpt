import React from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';
import { LogoIcon } from './icons';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const texts = TEXTS[language].header;

  const toggleLanguage = () => {
    onLanguageChange(language === 'ko' ? 'en' : 'ko');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <LogoIcon className="h-8 w-8 text-brand-blue" />
            <span className="font-display text-2xl text-brand-blue">Kid GPT</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#parents" className="text-sm font-semibold text-gray-600 hover:text-brand-blue transition-colors">
              {texts.parentsLink}
            </a>
            <div className="flex items-center bg-gray-200 rounded-full p-1 cursor-pointer" onClick={toggleLanguage}>
              <button
                className={`px-3 py-1 text-sm font-bold rounded-full transition-colors ${language === 'ko' ? 'bg-white text-brand-blue shadow' : 'text-gray-500'}`}
              >
                한
              </button>
              <button
                className={`px-3 py-1 text-sm font-bold rounded-full transition-colors ${language === 'en' ? 'bg-white text-brand-blue shadow' : 'text-gray-500'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;