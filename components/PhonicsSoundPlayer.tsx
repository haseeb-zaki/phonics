'use client';

import { hasJollyPhonicsAudio } from '@/lib/jolly-audio';
import JollyPhonicsAudioPlayer from './JollyPhonicsAudioPlayer';

interface PhonicsSoundPlayerProps {
  letter: string;
  className?: string;
  rate?: number;
  pitch?: number;
}

export default function PhonicsSoundPlayer({
  letter,
  className = '',
  rate,
  pitch,
}: PhonicsSoundPlayerProps) {
  // Only use Jolly Phonics audio files
  const hasAudio = hasJollyPhonicsAudio(letter);

  if (!hasAudio) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Audio not available for this letter.
      </div>
    );
  }

  return (
    <div className={className}>
      <JollyPhonicsAudioPlayer letter={letter} />
      <p className="text-xs text-gray-500 mt-2 text-center">
        Official Jolly Phonics audio from Jolly Kingdom
      </p>
    </div>
  );
}
