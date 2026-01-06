'use client';

import type { PracticeMode } from '@/types';

interface PracticeModeSelectorProps {
  mode: PracticeMode;
  onSelect: (mode: PracticeMode) => void;
  className?: string;
}

export default function PracticeModeSelector({
  mode,
  onSelect,
  className = '',
}: PracticeModeSelectorProps) {
  return (
    <div className={`flex gap-4 mb-6 ${className}`}>
      <button
        onClick={() => onSelect('words')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          mode === 'words'
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="Practice with words"
        aria-pressed={mode === 'words'}
      >
        📝 Words
      </button>
      <button
        onClick={() => onSelect('letters')}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          mode === 'letters'
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="Practice with letters"
        aria-pressed={mode === 'letters'}
      >
        🔤 Letters (A-Z)
      </button>
    </div>
  );
}

