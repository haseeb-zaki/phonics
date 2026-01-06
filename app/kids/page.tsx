'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import WordDisplay from '@/components/WordDisplay';
import LetterDisplay from '@/components/LetterDisplay';
import PhonicsSoundPlayer from '@/components/PhonicsSoundPlayer';
import SpellingInput from '@/components/SpellingInput';
import ScoreFeedback from '@/components/ScoreFeedback';
import ProgressTracker from '@/components/ProgressTracker';
import DifficultySelector from '@/components/DifficultySelector';
import PracticeModeSelector from '@/components/PracticeModeSelector';
import PhonicsHints from '@/components/PhonicsHints';
import JollyPhonicsDisplay from '@/components/JollyPhonicsDisplay';
import JollyPhonicsLetterSelector from '@/components/JollyPhonicsLetterSelector';
import GroupWordSelector from '@/components/GroupWordSelector';
import WordSoundPlayer from '@/components/WordSoundPlayer';
import { getRandomWord, hasWords } from '@/lib/words';
import { getRandomWordFromGroup, hasWordsInGroup } from '@/lib/words-by-group';
import { getRandomLetter, getLetterTip, getLetterExamples } from '@/lib/letters';
import { updateProgress } from '@/lib/progress';
import { playJollyPhonicsAudio } from '@/lib/jolly-audio';
import type { WordLength, PracticeMode } from '@/types';

export default function KidsPractice() {
  const [mode, setMode] = useState<PracticeMode>('words');
  const [wordLength, setWordLength] = useState<WordLength>('3');
  const [wordGroup, setWordGroup] = useState<number | null>(1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [customWord, setCustomWord] = useState<string>('');

  useEffect(() => {
    if (mode === 'words') {
      loadNewWord();
    } else {
      loadNewLetter();
    }
  }, [wordLength, mode, wordGroup]);

  const loadNewWord = () => {
    if (wordGroup && hasWordsInGroup('kids', wordGroup, wordLength)) {
      const word = getRandomWordFromGroup('kids', wordGroup, wordLength);
      if (word) {
        setCurrentWord(word);
        setCurrentLetter(null);
        setFeedback(null);
        setShowManualInput(false);
      }
    } else if (!wordGroup && hasWords('kids', wordLength)) {
      const word = getRandomWord('kids', wordLength);
      if (word) {
        setCurrentWord(word);
        setCurrentLetter(null);
        setFeedback(null);
        setShowManualInput(false);
      }
    }
  };

  const loadNewLetter = () => {
    const letter = getRandomLetter();
    if (letter) {
      setCurrentLetter(letter);
      setCurrentWord('');
      setFeedback(null);
      setShowManualInput(false);
    }
  };

  const handleSpellingSubmit = (input: string) => {
    if (mode === 'words') {
      const isCorrect = input.toLowerCase() === currentWord.toLowerCase();
      setFeedback(isCorrect);
      updateProgress('kids', wordLength, currentWord, isCorrect);

      if (isCorrect) {
        // Load new word after delay (no audio for words, only letters use audio)
        setTimeout(() => {
          loadNewWord();
        }, 2000);
      }
    } else if (mode === 'letters' && currentLetter) {
      const isCorrect = input.toLowerCase() === currentLetter.toLowerCase();
      setFeedback(isCorrect);

      if (isCorrect) {
        // Auto-play Jolly Phonics audio on correct answer
        setTimeout(() => {
          playJollyPhonicsAudio(currentLetter).catch(() => {
            // If audio fails, just continue
          });
        }, 500);
        // Load new letter after delay
        setTimeout(() => {
          loadNewLetter();
        }, 2000);
      }
    }
  };

  const handleManualInput = () => {
    setShowManualInput(true);
  };

  const handleManualEntry = (input: string) => {
    // After manual entry, play the Jolly Phonics audio
    if (mode === 'letters' && currentLetter) {
      playJollyPhonicsAudio(currentLetter).catch(() => {
        // If audio fails, just continue
      });
    }
    setShowManualInput(false);
  };

  const handleLetterSelect = (letter: string) => {
    setCurrentLetter(letter);
    setFeedback(null);
    setShowManualInput(false);
  };

  if (mode === 'words' && !currentWord) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <div className="container mx-auto py-12 text-center">
            <p className="text-xl">Loading words...</p>
          </div>
        </main>
      </>
    );
  }

  if (mode === 'letters' && !currentLetter) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
          <div className="container mx-auto py-12 text-center">
            <p className="text-xl">Loading letters...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="container mx-auto py-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            👶 Kids Practice
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-6">
            <PracticeModeSelector mode={mode} onSelect={setMode} />

            {mode === 'words' ? (
              <>
                <GroupWordSelector
                  userType="kids"
                  selectedGroup={wordGroup}
                  selectedLength={wordLength}
                  onGroupSelect={setWordGroup}
                  onLengthSelect={setWordLength}
                  className="mb-6"
                />

                <div className="text-center mb-6">
                  <WordDisplay 
                    word={currentWord} 
                    userType="kids" 
                    onClick={async () => {
                      if (currentWord) {
                        const { playWordSound } = await import('@/components/WordSoundPlayer');
                        try {
                          await playWordSound(currentWord);
                        } catch (error) {
                          console.error('Error playing word:', error);
                        }
                      }
                    }}
                  />
                </div>

                {currentWord && currentWord.length > 0 && (
                  <div className="mb-6">
                    <WordSoundPlayer word={currentWord} />
                  </div>
                )}

                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
                    🔊 Try Your Own Word
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Type any word to see its sound breakdown:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="custom-word-input"
                      placeholder="Enter a word..."
                      className="flex-1 px-4 py-2 border-2 border-blue-300 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          const word = input.value.trim().toLowerCase();
                          if (word) {
                            setCustomWord(word);
                            setFeedback(null);
                            setShowManualInput(false);
                          }
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('custom-word-input') as HTMLInputElement;
                        if (input) {
                          const word = input.value.trim().toLowerCase();
                          if (word) {
                            setCustomWord(word);
                            setFeedback(null);
                            setShowManualInput(false);
                          }
                        }
                      }}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Load
                    </button>
                  </div>
                </div>

                {customWord && customWord.length > 0 && (
                  <>
                    <div className="text-center mb-6">
                      <WordDisplay 
                        word={customWord} 
                        userType="kids" 
                        onClick={async () => {
                          if (customWord) {
                            const { playWordSound } = await import('@/components/WordSoundPlayer');
                            try {
                              await playWordSound(customWord);
                            } catch (error) {
                              console.error('Error playing word:', error);
                            }
                          }
                        }}
                      />
                    </div>

                    <div className="mb-6">
                      <WordSoundPlayer word={customWord} />
                    </div>
                  </>
                )}

                <div className="flex flex-col items-center gap-4 mb-6">
                  {!showManualInput && (
                    <button
                      onClick={handleManualInput}
                      className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors"
                    >
                      Can't pronounce? Type it here
                    </button>
                  )}
                  {showManualInput && (
                    <div className="w-full max-w-md">
                      <SpellingInput
                        onSubmit={handleManualEntry}
                        placeholder="Type the word to hear it..."
                      />
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <PhonicsHints word={currentWord} className="flex justify-center" />
                </div>

                <div className="mb-6">
                  <SpellingInput
                    onSubmit={handleSpellingSubmit}
                    placeholder="Try spelling the word..."
                    disabled={feedback !== null}
                  />
                </div>

                <ScoreFeedback word={currentWord} isCorrect={feedback} />

                {feedback === true && (
                  <div className="text-center mt-4">
                    <button
                      onClick={loadNewWord}
                      className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Next Word →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <JollyPhonicsLetterSelector
                  selectedLetter={currentLetter}
                  onSelect={handleLetterSelect}
                  className="mb-6"
                />

                {currentLetter && (
                  <>
                    <div className="text-center mb-6">
                      <LetterDisplay letter={currentLetter} userType="kids" />
                    </div>

                    <div className="flex flex-col items-center gap-4 mb-6">
                      <PhonicsSoundPlayer letter={currentLetter} rate={0.9} pitch={1.1} />
                      {!showManualInput && (
                        <button
                          onClick={handleManualInput}
                          className="px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors"
                        >
                          Can't pronounce? Type it here
                        </button>
                      )}
                      {showManualInput && (
                        <div className="w-full max-w-md">
                          <SpellingInput
                            onSubmit={handleManualEntry}
                            placeholder="Type the letter to hear it..."
                          />
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <JollyPhonicsDisplay letter={currentLetter} />
                    </div>

                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-700 rounded-lg">
                      <p className="text-purple-800 dark:text-purple-200 font-semibold mb-2">
                        Phonics Tip:
                      </p>
                      <p className="text-purple-700 dark:text-purple-300">
                        {getLetterTip(currentLetter)}
                      </p>
                    </div>

                    <div className="mb-6">
                      <SpellingInput
                        onSubmit={handleSpellingSubmit}
                        placeholder="Type the letter name (A, B, C...)..."
                        disabled={feedback !== null}
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        Tip: Type the letter name, then listen to its phonics sounds above!
                      </p>
                    </div>

                    <ScoreFeedback word={currentLetter} isCorrect={feedback} />

                    <div className="text-center mt-4">
                      <button
                        onClick={loadNewLetter}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        Next Letter →
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <ProgressTracker userType="kids" wordLength={wordLength} />
        </div>
      </main>
    </>
  );
}

