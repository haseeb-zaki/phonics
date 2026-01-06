'use client';

import { useState, useRef } from 'react';
import { playWordBySounds, breakWordIntoSounds, getWordSoundBreakdown } from '@/lib/word-sounds';
import { getJollyPhonicsSound } from '@/lib/jolly-sounds';
import { playJollyPhonicsAudio } from '@/lib/jolly-audio';
import { speakText } from '@/lib/speech';

interface WordSoundPlayerProps {
  word: string;
  className?: string;
  onWordClick?: () => void;
}

export function playWordSound(word: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const sounds = breakWordIntoSounds(word);
      
      if (sounds.length === 0) {
        reject(new Error('Cannot break down word into sounds'));
        return;
      }

      // Step 1: Play each sound sequentially
      for (let i = 0; i < sounds.length; i++) {
        await playJollyPhonicsAudio(sounds[i]);
        if (i < sounds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      // Step 2: Pause before playing the complete word
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 3: Play the complete word using Web Speech API (TTS)
      await speakText(word, {
        rate: 0.4, // Slower speed for better understanding
        pitch: 1.0,
        volume: 1.0,
        lang: 'en-US',
      });
      
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export default function WordSoundPlayer({ word, className = '' }: WordSoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSoundIndex, setCurrentSoundIndex] = useState<number | null>(null);
  const sounds = breakWordIntoSounds(word);
  const soundBreakdown = getWordSoundBreakdown(word);
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  
  const stopAllAudio = () => {
    audioRefs.current.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    audioRefs.current = [];
  };


  const handlePlayComplete = async () => {
    if (isPlaying) {
      // Stop playback
      const { stopSpeech } = await import('@/lib/speech');
      stopSpeech();
      stopAllAudio();
      setIsPlaying(false);
      setCurrentSoundIndex(null);
      return;
    }

    if (sounds.length === 0) {
      return;
    }

    try {
      setIsPlaying(true);
      setCurrentSoundIndex(0);

      // Step 1: Play each sound sequentially (slower, for learning)
      for (let i = 0; i < sounds.length; i++) {
        setCurrentSoundIndex(i);
        await playJollyPhonicsAudio(sounds[i]);
        
        // Small pause between sounds
        if (i < sounds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      // Step 2: Pause before playing the complete word
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 3: Play the complete word using Web Speech API (TTS)
      setCurrentSoundIndex(-1); // Indicate we're playing the full word
      
      // Use Web Speech API to pronounce the word with slower speed for better understanding
      try {
        await speakText(word, {
          rate: 0.4, // Slower speed (0.1 to 10, default is 1) - 0.4 is 40% of normal speed for maximum clarity
          pitch: 1.0,
          volume: 1.0,
          lang: 'en-US',
        });
      } catch (error) {
        console.error('Error playing word with TTS:', error);
        // Fallback: if TTS fails, play sounds sequentially
        for (let i = 0; i < sounds.length; i++) {
          try {
            await playJollyPhonicsAudio(sounds[i]);
            if (i < sounds.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          } catch (err) {
            console.error(`Error playing sound ${sounds[i]}:`, err);
          }
        }
      }
      
      setCurrentSoundIndex(null); // Clear highlight

      setIsPlaying(false);
    } catch (error) {
      console.error('Error playing complete word:', error);
      setIsPlaying(false);
      setCurrentSoundIndex(null);
    }
  };

  if (!word || word.length === 0) {
    return null;
  }

  if (sounds.length === 0) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Cannot break down this word into Jolly Phonics sounds.
      </div>
    );
  }

  return (
    <div className={`bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
        🔊 Word Sound Breakdown
      </h3>
      
      {sounds.length === 0 ? (
        <div className="text-sm text-gray-500 mb-3">
          Cannot break down "{word}" into Jolly Phonics sounds. Some letters may not be in Jolly Phonics.
        </div>
      ) : (
        <>
          <div className="mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Word sounds: <span className="font-semibold text-purple-600 dark:text-purple-400">{soundBreakdown}</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {sounds.map((sound, index) => {
                const soundText = getJollyPhonicsSound(sound) || sound;
                const isCurrent = currentSoundIndex === index && isPlaying;
                return (
                  <button
                    key={index}
                    onClick={async () => {
                      try {
                        await playJollyPhonicsAudio(sound);
                      } catch (error) {
                        console.error(`Error playing sound ${sound}:`, error);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg font-bold text-sm transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                      isCurrent
                        ? 'bg-yellow-400 text-gray-900 scale-110 shadow-lg animate-pulse'
                        : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-500 hover:shadow-md'
                    }`}
                    aria-label={`Play ${sound} sound`}
                  >
                    <div className="text-center">
                      <div className="text-lg">{sound.toUpperCase()}</div>
                      <div className="text-xs mt-1">{soundText}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </>
      )}
    </div>
  );
}

