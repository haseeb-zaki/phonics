'use client';

import { useEffect, useState } from 'react';
import { getPronunciationTip } from '@/lib/phonics';

interface ScoreFeedbackProps {
  isCorrect: boolean | null;
  word: string;
  className?: string;
}

export default function ScoreFeedback({
  isCorrect,
  word,
  className = '',
}: ScoreFeedbackProps) {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (isCorrect !== null) {
      setShowTip(true);
      const timer = setTimeout(() => setShowTip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  if (isCorrect === null || !showTip) {
    return null;
  }

  const tip = getPronunciationTip(word, isCorrect);

  return (
    <div
      className={`p-4 rounded-lg transition-all duration-300 ${
        isCorrect
          ? 'bg-green-100 border-2 border-green-500 text-green-800'
          : 'bg-red-100 border-2 border-red-500 text-red-800'
      } ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <span className="text-2xl">✓</span>
            <span className="font-bold text-lg">Correct!</span>
          </>
        ) : (
          <>
            <span className="text-2xl">✗</span>
            <span className="font-bold text-lg">Incorrect</span>
          </>
        )}
      </div>
      <p className="text-sm">{tip}</p>
    </div>
  );
}

