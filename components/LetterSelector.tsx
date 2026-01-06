'use client';

import { useState } from 'react';
import { getAllLetters } from '@/lib/letters';

interface LetterSelectorProps {
  selectedLetter: string | null;
  onSelect: (letter: string) => void;
  className?: string;
}

export default function LetterSelector({
  selectedLetter,
  onSelect,
  className = '',
}: LetterSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const letters = getAllLetters();

  const filteredLetters = letters.filter((letter) =>
    letter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search letter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          aria-label="Search for a letter"
        />
      </div>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
        {filteredLetters.map((letter) => (
          <button
            key={letter}
            onClick={() => onSelect(letter)}
            className={`px-3 py-2 rounded-lg font-bold text-lg transition-all ${
              selectedLetter === letter
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label={`Select letter ${letter}`}
            aria-pressed={selectedLetter === letter}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

