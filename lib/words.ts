import type { WordData, WordLength, UserType } from '@/types';
import wordsData from '@/data/words.json';

const wordData = wordsData as WordData;

export function getWordsByLength(
  userType: UserType,
  length: WordLength
): string[] {
  return wordData[userType][length] || [];
}

export function getRandomWord(
  userType: UserType,
  length: WordLength
): string | null {
  const words = getWordsByLength(userType, length);
  if (words.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function getAllWords(userType: UserType): Record<WordLength, string[]> {
  return wordData[userType];
}

export function getWordCount(userType: UserType, length: WordLength): number {
  return getWordsByLength(userType, length).length;
}

export function hasWords(userType: UserType, length: WordLength): boolean {
  const words = getWordsByLength(userType, length);
  return words.length > 0;
}

