
import React, { useState, useEffect, useCallback } from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';
import { generateSticker } from '../services/geminiService';
import { DownloadIcon, ImageIcon, XCircleIcon } from './icons';

interface StickerPanelProps {
  language: Language;
  inferredAnimal: string | null;
}

const StickerPanel: React.FC<StickerPanelProps> = ({ language, inferredAnimal }) => {
  const texts = TEXTS[language].demo;
  const [animalInput, setAnimalInput] = useState('');
  const [stickerImage, setStickerImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuggestion, setIsSuggestion] = useState(false);

  useEffect(() => {
    if (inferredAnimal) {
      setAnimalInput(inferredAnimal);
      setIsSuggestion(true);
    }
  }, [inferredAnimal]);

  const handleGenerateSticker = async () => {
    if (!animalInput.trim() || isGenerating) return;

    setIsSuggestion(false);
    setIsGenerating(true);
    setError(null);
    setStickerImage(null);

    try {
      const base64Image = await generateSticker(animalInput);
      setStickerImage(`data:image/png;base64,${base64Image}`);
    } catch (e) {
      setError(texts.error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (!stickerImage) return;
    const link = document.createElement('a');
    link.href = stickerImage;
    const timestamp = new Date().getTime();
    const safeAnimalName = animalInput.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `kidgpt-sticker-${safeAnimalName}-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [stickerImage, animalInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalInput(e.target.value);
    setIsSuggestion(false);
  };

  return (
    <div className="bg-green-50 border-2 border-brand-green/20 rounded-2xl p-6 shadow-lg h-full flex flex-col">
      <h2 className="font-display text-3xl text-brand-green">{texts.stickerTitle}</h2>
      <p className="text-gray-600 mb-4">{texts.stickerSubtitle}</p>
      
      <div className="flex gap-2 mb-4">
        <label htmlFor="sticker-input" className="sr-only">{texts.animalNamePlaceholder}</label>
        <input
          id="sticker-input"
          type="text"
          value={animalInput}
          onChange={handleInputChange}
          placeholder={texts.animalNamePlaceholder}
          className={`flex-grow w-full px-4 py-3 border-2 border-gray-300 rounded-full placeholder-gray-400 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition ${isSuggestion ? 'text-gray-500' : 'text-brand-text'}`}
          disabled={isGenerating}
        />
      </div>

      <button onClick={handleGenerateSticker} disabled={isGenerating || !animalInput} className="w-full bg-brand-green text-white font-bold text-xl py-4 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100">
        {isGenerating ? texts.generatingSticker : texts.stickerButton}
      </button>

      <div className="bg-white rounded-lg mt-4 p-4 flex-grow min-h-[250px] flex items-center justify-center border relative">
        {!stickerImage && !isGenerating && !error && (
          <div className="text-center text-gray-400">
            <ImageIcon className="w-16 h-16 mx-auto" />
            <p className="mt-2 font-semibold">Stickers will appear here!</p>
          </div>
        )}
        {isGenerating && (
          <div className="text-center text-gray-500">
             <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto"></div>
             <p className="mt-4 font-semibold">{texts.generatingSticker}</p>
          </div>
        )}
        {error && (
            <div className="text-center text-brand-red">
                <XCircleIcon className="w-12 h-12 mx-auto"/>
                <p className="mt-2 font-semibold">{error}</p>
            </div>
        )}
        {stickerImage && (
          <>
            <img src={stickerImage} alt={`${animalInput} sticker`} className="max-w-full max-h-64 object-contain" />
            <button onClick={handleDownload} className="absolute bottom-4 right-4 bg-brand-blue text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110">
              <DownloadIcon className="w-6 h-6" />
              <span className="sr-only">{texts.saveSticker}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StickerPanel;
