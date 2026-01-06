import type { LettersData, LetterData } from '@/types';
import lettersData from '@/data/letters.json';

const letterData = lettersData as LettersData;

export function getLetterData(letter: string): LetterData | null {
  const upperLetter = letter.toUpperCase();
  // Try uppercase first, then lowercase
  return letterData.letters[upperLetter] || letterData.letters[letter.toLowerCase()] || null;
}

export function getAllLetters(): string[] {
  return Object.keys(letterData.letters).sort();
}

export function getRandomLetter(): string | null {
  const letters = getAllLetters();
  if (letters.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

export function getLetterSounds(letter: string): string[] {
  const data = getLetterData(letter);
  return data?.sounds || [];
}

export function getLetterExamples(letter: string): string[] {
  const data = getLetterData(letter);
  return data?.examples || [];
}

export function getLetterTip(letter: string): string {
  const data = getLetterData(letter);
  return data?.tip || '';
}

