'use client';

import { useState } from 'react';
import { getAllJollyPhonicsGroups, getLettersInGroup } from '@/lib/jolly-phonics';

interface JollyPhonicsGroupSelectorProps {
  onSelectLetter: (letter: string) => void;
  className?: string;
}

export default function JollyPhonicsGroupSelector({
  onSelectLetter,
  className = '',
}: JollyPhonicsGroupSelectorProps) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const groups = getAllJollyPhonicsGroups();

  return (
    <div className={className}>
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        🎯 Jolly Phonics Groups
      </h3>
      <div className="space-y-3">
        {groups.map((group) => (
          <div
            key={group.group}
            className="border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
            style={{
              borderColor: selectedGroup === group.group ? '#8b5cf6' : '#e5e7eb',
              backgroundColor: selectedGroup === group.group ? '#f3e8ff' : 'white',
            }}
            onClick={() => setSelectedGroup(selectedGroup === group.group ? null : group.group)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                Group {group.group}
              </h4>
              <span className="text-sm text-gray-500">
                {selectedGroup === group.group ? '▼' : '▶'}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {group.description}
            </p>
            {selectedGroup === group.group && (
              <div className="flex flex-wrap gap-2 mt-3">
                {group.letters.map((letter) => (
                  <button
                    key={letter}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLetter(letter);
                    }}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                    aria-label={`Select letter ${letter}`}
                  >
                    {letter.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

