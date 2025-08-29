import React from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';
import { PawIcon, StarIcon, RocketIcon } from './icons';

interface HeroProps {
  language: Language;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, onCtaClick }) => {
  const texts = TEXTS[language].hero;

  return (
    <section className="relative bg-brand-yellow/20 pt-24 pb-12 sm:pt-32 sm:pb-16 text-center overflow-hidden">
      <div className="absolute top-1/4 left-10 opacity-20 -translate-x-1/2 text-brand-red">
        <PawIcon className="w-24 h-24 animate-bounce-slow" />
      </div>
      <div className="absolute top-1/2 right-0 opacity-20 translate-x-1/4 text-brand-green">
        <StarIcon className="w-32 h-32 animate-pulse-slow" />
      </div>
      <div className="absolute bottom-10 left-1/4 opacity-20 text-brand-blue">
        <RocketIcon className="w-16 h-16 animate-pulse-slow delay-500" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="font-display text-5xl sm:text-7xl text-brand-text leading-tight">
          {texts.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-700">
          {texts.tagline}
        </p>
        <div className="mt-10">
          <button
            onClick={onCtaClick}
            className="bg-brand-blue hover:bg-blue-600 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {texts.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;