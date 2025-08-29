
import React from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const texts = TEXTS[language].footer;

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
        <p>{texts.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
