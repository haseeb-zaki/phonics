'use client';

import { useState, useEffect, useRef } from 'react';
import { hasJollyPhonicsAudio, getJollyPhonicsAudioUrl, getJollyPhonicsRemoteUrl } from '@/lib/jolly-audio';

const LOCAL_AUDIO_BASE_URL = '/sounds/';

interface JollyPhonicsAudioPlayerProps {
  letter: string;
  className?: string;
  showUrl?: boolean;
}

export default function JollyPhonicsAudioPlayer({
  letter,
  className = '',
  showUrl = false,
}: JollyPhonicsAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = getJollyPhonicsAudioUrl(letter, true);
  const remoteUrl = getJollyPhonicsRemoteUrl(letter);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [letter]);

  const handlePlay = async () => {
    if (!hasJollyPhonicsAudio(letter)) {
      setError(`No audio available for "${letter}"`);
      return;
    }

    if (isPlaying && audioRef.current) {
      // Stop if already playing
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Clean up previous audio if exists
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      // Try remote URL first (more reliable than local)
      const tryUrl = remoteUrl || audioUrl;
      if (!tryUrl) {
        setError('No audio available for this letter');
        setIsLoading(false);
        return;
      }
      
      audioRef.current = new Audio(tryUrl);
      audioRef.current.crossOrigin = 'anonymous';
      
      // Set up error handler
      const handleAudioError = (e: Event) => {
        // Only show error if audio actually failed to load
        if (audioRef.current && audioRef.current.readyState === 0) {
          console.error('Audio error:', e);
          // If remote failed and we have local, try local
          if (remoteUrl && audioUrl && audioRef.current && audioRef.current.src.includes(remoteUrl)) {
            console.log('Remote failed, trying local URL...');
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            audioRef.current.play().catch((err) => {
              console.error('Local also failed:', err);
              setError('Audio file not found. Please download audio files using: .\\scripts\\download-jolly-sounds.ps1');
              setIsPlaying(false);
              setIsLoading(false);
            });
          } else if (audioUrl && audioRef.current && audioRef.current.src.includes(audioUrl)) {
            // Local also failed
            setError('Audio file not found. Please download audio files using: .\\scripts\\download-jolly-sounds.ps1');
            setIsPlaying(false);
            setIsLoading(false);
          } else {
            // Unknown error
            setError('Failed to load audio. Please check your internet connection or download audio files.');
            setIsPlaying(false);
            setIsLoading(false);
          }
        }
      };
      
      audioRef.current.addEventListener('error', handleAudioError);
      audioRef.current.oncanplaythrough = () => {
        // Audio loaded successfully, clear any previous errors
        setError(null);
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      await audioRef.current.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      // If remote failed, try local
      if (remoteUrl && audioUrl && audioRef.current) {
        try {
          audioRef.current.src = audioUrl;
          audioRef.current.load();
          await audioRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
        } catch (localError) {
          console.error('Local also failed:', localError);
          setError('Audio file not found. Please download audio files using: .\\scripts\\download-jolly-sounds.ps1');
          setIsPlaying(false);
          setIsLoading(false);
        }
      } else {
        setError('Audio file not found. Please download audio files using: .\\scripts\\download-jolly-sounds.ps1');
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  };

  if (!hasJollyPhonicsAudio(letter)) {
    return null;
  }

  return (
    <div className={className}>
      <button
        onClick={handlePlay}
        disabled={isLoading}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          isPlaying
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
        aria-label={isPlaying ? 'Stop Jolly Phonics sound' : 'Play Jolly Phonics sound'}
        aria-pressed={isPlaying}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span> Loading...
          </span>
        ) : isPlaying ? (
          <span className="flex items-center gap-2">
            <span className="animate-pulse">⏸ Stop</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            🔊 Play Jolly Phonics Audio
          </span>
        )}
      </button>
      
      {error && (
        <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
      )}
      
      {showUrl && audioUrl && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Audio: <a href={audioUrl} target="_blank" rel="noopener noreferrer" className="underline">{audioUrl}</a>
        </p>
      )}
    </div>
  );
}
