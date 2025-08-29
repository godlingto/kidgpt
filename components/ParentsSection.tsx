import React from 'react';
import type { Language } from '../types';
import { TEXTS } from '../constants';
import { ShieldCheckIcon, UserPlusIcon, BrainCircuitIcon } from './icons';

interface ParentsSectionProps {
  language: Language;
}

const ICONS = [
  (props: any) => <ShieldCheckIcon {...props} />,
  (props: any) => <UserPlusIcon {...props} />,
  (props: any) => <BrainCircuitIcon {...props} />,
];

const ParentsSection: React.FC<ParentsSectionProps> = ({ language }) => {
  const texts = TEXTS[language].parents;

  return (
    <section id="parents" className="py-20 bg-brand-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl text-brand-text">
          {texts.title}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          {texts.subtitle}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {texts.points.map((point: any, index: number) => {
            const Icon = ICONS[index];
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 bg-brand-yellow/20 rounded-full mb-4">
                  <Icon className="w-7 h-7 text-brand-yellow" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ParentsSection;