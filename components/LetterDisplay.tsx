'use client';

import type { UserType } from '@/types';
import { getLetterData } from '@/lib/letters';

interface LetterDisplayProps {
  letter: string;
  userType: UserType;
  className?: string;
}

export default function LetterDisplay({
  letter,
  userType,
  className = '',
}: LetterDisplayProps) {
  const letterData = getLetterData(letter);
  const sounds = letterData?.sounds || [];
  const examples = letterData?.examples || [];

  const baseStyles =
    'text-6xl md:text-8xl font-bold text-center mb-4 select-none';
  const kidsStyles =
    'font-comic text-yellow-400 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]';
  const adultsStyles = 'font-sans text-gray-800 dark:text-gray-200';

  return (
    <div className={`${className}`}>
      <div
        className={`${baseStyles} ${
          userType === 'kids' ? kidsStyles : adultsStyles
        }`}
        role="text"
        aria-label={`Letter: ${letter}`}
      >
        {letter.toUpperCase()}
      </div>
      {sounds.length > 0 && (
        <div className="text-center mb-4">
          <div className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Sounds: {sounds.join(', ')}
          </div>
          {examples.length > 0 && (
            <div className="text-lg text-gray-600 dark:text-gray-400">
              Examples: {examples.join(', ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

