'use client';

import { useState, useEffect } from 'react';
import { getAllJollyPhonicsGroups, getJollyPhonicsGroup, getGroupForLetter } from '@/lib/jolly-phonics';
import { playJollyPhonicsAudio } from '@/lib/jolly-audio';

interface JollyPhonicsLetterSelectorProps {
  selectedLetter: string | null;
  onSelect: (letter: string) => void;
  className?: string;
  autoPlay?: boolean;
}

export default function JollyPhonicsLetterSelector({
  selectedLetter,
  onSelect,
  className = '',
  autoPlay = true,
}: JollyPhonicsLetterSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(1);
  const groups = getAllJollyPhonicsGroups();

  // Auto-select group when a letter is selected
  useEffect(() => {
    if (selectedLetter) {
      const group = getGroupForLetter(selectedLetter);
      if (group) {
        setSelectedGroup(group);
      }
    }
  }, [selectedLetter]);

  const currentGroup = selectedGroup ? getJollyPhonicsGroup(selectedGroup) : null;
  const letters = currentGroup?.letters || [];

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Select Jolly Phonics Group:
        </h3>
        <div className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <button
              key={group.group}
              onClick={() => setSelectedGroup(group.group)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedGroup === group.group
                  ? 'bg-purple-500 text-white shadow-md scale-105'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label={`Select group ${group.group}`}
              aria-pressed={selectedGroup === group.group}
            >
              Group {group.group}
            </button>
          ))}
        </div>
        {currentGroup && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {currentGroup.description}
          </p>
        )}
      </div>

      {currentGroup && (
        <div>
          <h4 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">
            Letters in Group {currentGroup.group}:
          </h4>
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {letters.map((letter) => {
              const handleLetterClick = () => {
                onSelect(letter);
                // Play audio immediately on click (only if autoPlay is enabled)
                if (autoPlay) {
                  // Small delay to ensure selection happens first
                  setTimeout(() => {
                    playJollyPhonicsAudio(letter).catch((error) => {
                      console.error('Failed to play audio:', error);
                    });
                  }, 100);
                }
              };

              return (
                <button
                  key={letter}
                  onClick={handleLetterClick}
                  className={`px-3 py-2 rounded-lg font-bold text-lg transition-all ${
                    selectedLetter === letter
                      ? 'bg-blue-500 text-white shadow-md scale-105'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Select letter ${letter} and play sound`}
                  aria-pressed={selectedLetter === letter}
                >
                  {letter.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

