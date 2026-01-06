'use client';

import { useEffect, useState } from 'react';
import { getProgressForLength } from '@/lib/progress';
import type { UserType, WordLength } from '@/types';

interface ProgressTrackerProps {
  userType: UserType;
  wordLength: WordLength;
  className?: string;
}

export default function ProgressTracker({
  userType,
  wordLength,
  className = '',
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState({ correct: 0, incorrect: 0, words: [] as string[] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateProgress = () => {
      const data = getProgressForLength(userType, wordLength);
      setProgress(data);
    };

    updateProgress();
    // Update progress when storage changes
    window.addEventListener('storage', updateProgress);
    // Also check periodically (for same-tab updates)
    const interval = setInterval(updateProgress, 1000);

    return () => {
      window.removeEventListener('storage', updateProgress);
      clearInterval(interval);
    };
  }, [userType, wordLength]);

  const total = progress.correct + progress.incorrect;
  const percentage = total > 0 ? Math.round((progress.correct / total) * 100) : 0;

  return (
    <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold mb-3">Your Progress</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Correct: {progress.correct}</span>
            <span>Incorrect: {progress.incorrect}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="sr-only">{percentage}% correct</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {percentage}% accuracy ({total} total attempts)
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Words practiced: {progress.words.length}
        </div>
      </div>
    </div>
  );
}

