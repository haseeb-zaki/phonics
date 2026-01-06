'use client';

import { useState } from 'react';
import { getPhonicsHint } from '@/lib/phonics';

interface PhonicsHintsProps {
  word: string;
  className?: string;
}

export default function PhonicsHints({ word, className = '' }: PhonicsHintsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hint = getPhonicsHint(word);

  if (!hint) {
    return null;
  }

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
        aria-label={isOpen ? 'Hide phonics hint' : 'Show phonics hint'}
        aria-expanded={isOpen}
      >
        {isOpen ? '🔒 Hide Hint' : '💡 Show Hint'}
      </button>
      {isOpen && (
        <div className="mt-3 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
            Phonics Rule:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 mb-2">
            <strong>{hint.rule}</strong>
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
            {hint.tip}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Examples: <em>{hint.example}</em>
          </p>
        </div>
      )}
    </div>
  );
}

