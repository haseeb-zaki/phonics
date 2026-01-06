'use client';

import { useState } from 'react';
import { getJollyPhonicsAction } from '@/lib/jolly-phonics';
import { getJollyPhonicsSound } from '@/lib/jolly-sounds';
import { playJollyPhonicsAudio } from '@/lib/jolly-audio';

interface JollyPhonicsDisplayProps {
  letter: string;
  className?: string;
}

export default function JollyPhonicsDisplay({
  letter,
  className = '',
}: JollyPhonicsDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const jollyAction = getJollyPhonicsAction(letter);

  if (!jollyAction) {
    return null;
  }

  const pureSound = getJollyPhonicsSound(letter);

  const playPureSound = async () => {
    setIsPlaying(true);
    try {
      // Play the Jolly Phonics audio file
      await playJollyPhonicsAudio(letter);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
    setIsPlaying(false);
  };

  const playStory = async () => {
    // Story is text only, no audio available
    setIsPlaying(false);
  };

  const playSong = async () => {
    // Song is text only, no audio available
    setIsPlaying(false);
  };

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl">🎭</span>
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
          Jolly Phonics
        </h3>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
            <span>🔊</span> Pure Sound:
          </h4>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-3">
            "{pureSound}"
          </p>
          <button
            onClick={playPureSound}
            disabled={isPlaying}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            aria-label="Play pure Jolly Phonics sound"
          >
            {isPlaying ? '⏸ Playing...' : '🔊 Listen to Sound'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
            <span>🤲</span> Action:
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {jollyAction.action}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
            <span>📖</span> Story:
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {jollyAction.story}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
            <span>🎵</span> Song:
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {jollyAction.song}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>💡 Tip:</strong> Do the action while saying the sound to help remember it!
        </p>
      </div>
    </div>
  );
}

