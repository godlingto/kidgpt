
import React, { useState } from 'react';
import type { Language, QAResponse, BlockedResponse } from '../types';
import { TEXTS, SUGGESTED_QUESTIONS } from '../constants';
import { getKidAnswer } from '../services/geminiService';
import { SparklesIcon, XCircleIcon } from './icons';

interface QAPanelProps {
  language: Language;
  onAnimalInfer: (animal: string | null) => void;
}

const QAPanel: React.FC<QAPanelProps> = ({ language, onAnimalInfer }) => {
  const texts = TEXTS[language].demo;
  const suggestions = SUGGESTED_QUESTIONS[language];

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [blockedResponse, setBlockedResponse] = useState<BlockedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleQuestionSubmit = async (query: string) => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);
    setBlockedResponse(null);
    onAnimalInfer(null);
    setQuestion(query);

    try {
      // For this simplified demo, we assume moderation is handled by Gemini's safety settings.
      // A production app would have a separate moderation step.
      const result: QAResponse = await getKidAnswer(query, language);
      setAnswer(result.answer);
      if(result.inferredAnimal) {
        onAnimalInfer(result.inferredAnimal);
      }
    } catch (e) {
      setError(texts.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion);
    handleQuestionSubmit(suggestion);
  };

  return (
    <div className="bg-blue-50 border-2 border-brand-blue/20 rounded-2xl p-6 shadow-lg h-full flex flex-col">
      <h2 className="font-display text-3xl text-brand-blue">{texts.qaTitle}</h2>
      <p className="text-gray-600 mb-4">{texts.qaSubtitle}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((q, index) => (
          <button key={index} onClick={() => handleSuggestionClick(q)} className="bg-white border border-brand-blue/30 text-brand-blue/80 text-sm px-3 py-1 rounded-full hover:bg-brand-blue/10 transition-colors">
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleQuestionSubmit(question); }} className="flex gap-2 mb-4">
        <label htmlFor="qa-input" className="sr-only">{texts.inputPlaceholder}</label>
        <input
          id="qa-input"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={texts.inputPlaceholder}
          className="flex-grow w-full px-4 py-3 border-2 border-gray-300 rounded-full placeholder-gray-400 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
          disabled={isLoading}
        />
        <button type="submit" className="bg-brand-blue text-white font-bold px-6 py-3 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100" disabled={isLoading}>
          {texts.submit}
        </button>
      </form>
      
      <div className="bg-white rounded-lg p-4 flex-grow min-h-[200px] flex items-center justify-center border">
        {isLoading && (
          <div className="text-center text-gray-500">
            <SparklesIcon className="w-12 h-12 mx-auto text-brand-yellow animate-spin-slow" />
            <p className="mt-2 font-semibold">{texts.loadingAnswer}</p>
          </div>
        )}
        {error && (
            <div className="text-center text-brand-red">
                <XCircleIcon className="w-12 h-12 mx-auto"/>
                <p className="mt-2 font-semibold">{error}</p>
            </div>
        )}
        {answer && (
          <p className="text-lg text-brand-text leading-relaxed">{answer}</p>
        )}
        {blockedResponse && (
            <div className="text-center">
                <p className="text-lg text-brand-text mb-4">{blockedResponse.message}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                    {blockedResponse.alternatives.map((alt, i) => (
                        <button key={i} onClick={() => handleSuggestionClick(alt)} className="bg-brand-green/20 text-brand-green-800 text-sm px-3 py-1 rounded-full hover:bg-brand-green/40 transition-colors">
                            {alt}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QAPanel;
