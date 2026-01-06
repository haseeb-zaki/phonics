'use client';

import type { UserType } from '@/types';

interface WordDisplayProps {
  word: string;
  userType: UserType;
  className?: string;
  onClick?: () => void;
}

export default function WordDisplay({
  word,
  userType,
  className = '',
  onClick,
}: WordDisplayProps) {
  const baseStyles =
    'text-6xl md:text-8xl font-bold text-center mb-6 select-none';
  const kidsStyles =
    'font-comic text-yellow-400 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]';
  const adultsStyles = 'font-sans text-gray-800 dark:text-gray-200';

  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${
        userType === 'kids' ? kidsStyles : adultsStyles
      } ${onClick ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all' : ''} ${className}`}
      role={onClick ? 'button' : 'text'}
      aria-label={onClick ? `Word: ${word}. Click to hear pronunciation.` : `Word: ${word}`}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {word.toUpperCase()}
    </div>
  );
}

