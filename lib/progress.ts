import type { AllProgress, UserProgress, UserType, WordLength } from '@/types';

const STORAGE_KEY = 'phonics-learning-progress';

export function loadProgress(): AllProgress {
  if (typeof window === 'undefined') {
    return { kids: {}, adults: {} };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }

  return { kids: {}, adults: {} };
}

export function saveProgress(progress: AllProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

export function updateProgress(
  userType: UserType,
  wordLength: WordLength,
  word: string,
  isCorrect: boolean
): void {
  const progress = loadProgress();
  const userProgress = progress[userType];
  const lengthKey = wordLength;

  if (!userProgress[lengthKey]) {
    userProgress[lengthKey] = {
      correct: 0,
      incorrect: 0,
      words: [],
    };
  }

  const lengthProgress = userProgress[lengthKey];

  if (isCorrect) {
    lengthProgress.correct += 1;
  } else {
    lengthProgress.incorrect += 1;
  }

  if (!lengthProgress.words.includes(word)) {
    lengthProgress.words.push(word);
  }

  saveProgress(progress);
}

export function getProgressForLength(
  userType: UserType,
  wordLength: WordLength
): { correct: number; incorrect: number; words: string[] } {
  const progress = loadProgress();
  const userProgress = progress[userType];
  const lengthKey = wordLength;

  return userProgress[lengthKey] || { correct: 0, incorrect: 0, words: [] };
}

export function clearProgress(userType?: UserType): void {
  if (userType) {
    const progress = loadProgress();
    progress[userType] = {};
    saveProgress(progress);
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

