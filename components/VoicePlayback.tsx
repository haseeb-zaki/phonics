'use client';

import { useState, useEffect } from 'react';
import { speakText, stopSpeech, isSpeechSupported } from '@/lib/speech';

interface VoicePlaybackProps {
  text: string;
  className?: string;
}

export default function VoicePlayback({
  text,
  className = '',
}: VoicePlaybackProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsSupported(isSpeechSupported());
  }, []);

  useEffect(() => {
    // Stop speech when component unmounts or text changes
    return () => {
      stopSpeech();
      setIsSpeaking(false);
    };
  }, [text]);

  const handlePlay = async () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      await speakText(text, {
        rate: 0.9,
        pitch: 1.0,
        volume: 1.0,
        lang: 'en-US',
      });
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error speaking text:', error);
      setIsSpeaking(false);
      alert('Unable to play audio. Please check your browser settings.');
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || isSupported === null) {
    return (
      <div className={`px-6 py-3 rounded-lg font-semibold bg-gray-300 text-gray-600 ${className}`}>
        Loading...
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className={`text-sm text-gray-500 ${className}`}>
        Voice playback not supported in this browser.
      </div>
    );
  }

  return (
    <button
      onClick={handlePlay}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
        isSpeaking
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      } ${className}`}
      aria-label={isSpeaking ? 'Stop pronunciation' : 'Play pronunciation'}
      aria-pressed={isSpeaking}
    >
      {isSpeaking ? (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">⏸ Stop</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          🔊 Play Sound
        </span>
      )}
    </button>
  );
}

