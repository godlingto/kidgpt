
import React, { useState, useRef, useCallback } from 'react';
import type { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import DemoWidget from './components/DemoWidget';
import ParentsSection from './components/ParentsSection';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ko');
  const demoRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const scrollToDemo = useCallback(() => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ErrorBoundary language={language}>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main>
          <Hero language={language} onCtaClick={scrollToDemo} />
          <div ref={demoRef} className="pt-20">
            <DemoWidget language={language} />
          </div>
          <ParentsSection language={language} />
        </main>
        <Footer language={language} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
