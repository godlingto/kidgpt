
import React, { useState } from 'react';
import type { Language } from '../types';
import QAPanel from './QAPanel';
import StickerPanel from './StickerPanel';

interface DemoWidgetProps {
  language: Language;
}

const DemoWidget: React.FC<DemoWidgetProps> = ({ language }) => {
  const [inferredAnimal, setInferredAnimal] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <QAPanel language={language} onAnimalInfer={setInferredAnimal} />
          <StickerPanel language={language} inferredAnimal={inferredAnimal} />
        </div>
      </div>
    </section>
  );
};

export default DemoWidget;
