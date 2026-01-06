export type UserType = 'kids' | 'adults';

export type WordLength = '2' | '3' | '4' | '5' | '6';

export interface WordData {
  kids: Record<WordLength, string[]>;
  adults: Record<WordLength, string[]>;
}

export interface ProgressData {
  correct: number;
  incorrect: number;
  words: string[];
}

export interface UserProgress {
  [key: string]: ProgressData; // key is wordLength
}

export interface AllProgress {
  kids: UserProgress;
  adults: UserProgress;
}

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export interface PhonicsHint {
  rule: string;
  example: string;
  tip: string;
}

export interface LetterData {
  sounds: string[];
  examples: string[];
  tip: string;
}

export interface LettersData {
  letters: Record<string, LetterData>;
}

export type PracticeMode = 'words' | 'letters';

export interface JollyPhonicsAction {
  action: string;
  story: string;
  song: string;
}

export interface JollyPhonicsGroup {
  group: number;
  letters: string[];
  description: string;
}

export interface JollyPhonicsData {
  groups: JollyPhonicsGroup[];
  actions: Record<string, JollyPhonicsAction>;
}

