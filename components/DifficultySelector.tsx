'use client';

import type { WordLength } from '@/types';

interface DifficultySelectorProps {
  selectedLength: WordLength;
  onSelect: (length: WordLength) => void;
  className?: string;
}

const lengths: { value: WordLength; label: string }[] = [
  { value: '2', label: '2 Letters' },
  { value: '3', label: '3 Letters' },
  { value: '4', label: '4 Letters' },
  { value: '5', label: '5 Letters' },
  { value: '6', label: '6 Letters' },
];

export default function DifficultySelector({
  selectedLength,
  onSelect,
  className = '',
}: DifficultySelectorProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {lengths.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedLength === value
              ? 'bg-blue-500 text-white shadow-md scale-105'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
          aria-label={`Select ${label}`}
          aria-pressed={selectedLength === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

