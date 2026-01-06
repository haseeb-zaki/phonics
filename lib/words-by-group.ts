import { getAllWords, getWordsByLength } from './words';
import { getLettersInGroup, getJollyPhonicsGroup } from './jolly-phonics';
import type { UserType, WordLength } from '@/types';

/**
 * Check if a word only uses letters from a specific Jolly Phonics group
 */
export function wordUsesOnlyGroupLetters(word: string, groupNumber: number): boolean {
  const groupLetters = getLettersInGroup(groupNumber);
  const lowerWord = word.toLowerCase();
  
  // Build a list of all possible letter combinations (single and digraphs)
  const allGroupLetters = new Set<string>();
  for (const letter of groupLetters) {
    allGroupLetters.add(letter);
  }
  
  // Check each character in the word
  let i = 0;
  while (i < lowerWord.length) {
    let matched = false;
    
    // First try to match digraphs (2-letter combinations)
    if (i < lowerWord.length - 1) {
      const digraph = lowerWord.substring(i, i + 2);
      if (allGroupLetters.has(digraph)) {
        matched = true;
        i += 2; // Skip both characters
      }
    }
    
    // If no digraph match, try single character
    if (!matched) {
      const char = lowerWord[i];
      if (allGroupLetters.has(char)) {
        matched = true;
        i++;
      } else {
        // Character not in group
        return false;
      }
    }
  }
  
  return true;
}

/**
 * Get words that use only letters from a specific Jolly Phonics group
 */
export function getWordsByGroup(
  userType: UserType,
  groupNumber: number,
  wordLength?: WordLength
): string[] {
  const allWords = getAllWords(userType);
  const groupLetters = getLettersInGroup(groupNumber);
  const words: string[] = [];
  
  // Get words from all lengths or specific length
  const lengthsToCheck: WordLength[] = wordLength 
    ? [wordLength] 
    : ['2', '3', '4', '5', '6'];
  
  for (const length of lengthsToCheck) {
    const wordsForLength = allWords[length] || [];
    
    for (const word of wordsForLength) {
      if (wordUsesOnlyGroupLetters(word, groupNumber)) {
        words.push(word);
      }
    }
  }
  
  return words;
}

/**
 * Get words by group and length
 */
export function getWordsByGroupAndLength(
  userType: UserType,
  groupNumber: number,
  wordLength: WordLength
): string[] {
  return getWordsByGroup(userType, groupNumber, wordLength);
}

/**
 * Get a random word from a specific group
 */
export function getRandomWordFromGroup(
  userType: UserType,
  groupNumber: number,
  wordLength?: WordLength
): string | null {
  const words = getWordsByGroup(userType, groupNumber, wordLength);
  
  if (words.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

/**
 * Check if a group has words available
 */
export function hasWordsInGroup(
  userType: UserType,
  groupNumber: number,
  wordLength?: WordLength
): boolean {
  const words = getWordsByGroup(userType, groupNumber, wordLength);
  return words.length > 0;
}

