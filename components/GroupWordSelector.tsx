'use client';

import { useState, useEffect } from 'react';
import { getAllJollyPhonicsGroups, getJollyPhonicsGroup, getGroupForLetter } from '@/lib/jolly-phonics';
import { hasWordsInGroup } from '@/lib/words-by-group';
import type { UserType, WordLength } from '@/types';

interface GroupWordSelectorProps {
  userType: UserType;
  selectedGroup: number | null;
  selectedLength: WordLength;
  onGroupSelect: (group: number) => void;
  onLengthSelect: (length: WordLength) => void;
  className?: string;
}

export default function GroupWordSelector({
  userType,
  selectedGroup,
  selectedLength,
  onGroupSelect,
  onLengthSelect,
  className = '',
}: GroupWordSelectorProps) {
  const groups = getAllJollyPhonicsGroups();

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Select Jolly Phonics Group for Words:
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {groups.map((group) => {
            const hasWords = hasWordsInGroup(userType, group.group, selectedLength);
            return (
              <button
                key={group.group}
                onClick={() => onGroupSelect(group.group)}
                disabled={!hasWords}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedGroup === group.group
                    ? 'bg-purple-500 text-white shadow-md scale-105'
                    : hasWords
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                }`}
                aria-label={`Select group ${group.group}`}
                aria-pressed={selectedGroup === group.group}
                aria-disabled={!hasWords}
              >
                Group {group.group}
                {!hasWords && ' (no words)'}
              </button>
            );
          })}
        </div>
        {selectedGroup && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getJollyPhonicsGroup(selectedGroup)?.description}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
          Word Length:
        </h3>
        <div className="flex flex-wrap gap-2">
          {(['2', '3', '4', '5', '6'] as WordLength[]).map((length) => {
            const hasWords = selectedGroup ? hasWordsInGroup(userType, selectedGroup, length) : false;
            return (
              <button
                key={length}
                onClick={() => onLengthSelect(length)}
                disabled={!hasWords && selectedGroup !== null}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedLength === length
                    ? 'bg-blue-500 text-white shadow-md scale-105'
                    : hasWords || selectedGroup === null
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                }`}
                aria-label={`Select ${length} letters`}
                aria-pressed={selectedLength === length}
                aria-disabled={!hasWords && selectedGroup !== null}
              >
                {length} Letters
                {selectedGroup && !hasWords && ' (none)'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

