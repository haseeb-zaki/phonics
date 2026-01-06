import { getLetterData } from './letters';

/**
 * Maps phonics sound symbols to example words that demonstrate the sound
 */
const soundToWord: Record<string, string> = {
  '/ă/': 'apple',
  '/ā/': 'ape',
  '/ä/': 'father',
  '/b/': 'ball',
  '/k/': 'cat',
  '/s/': 'cent',
  '/d/': 'dog',
  '/ĕ/': 'egg',
  '/ē/': 'eagle',
  '/f/': 'fish',
  '/g/': 'goat',
  '/j/': 'gem',
  '/h/': 'hat',
  '/ĭ/': 'igloo',
  '/ī/': 'ice',
  '/l/': 'lion',
  '/m/': 'moon',
  '/n/': 'nest',
  '/ŏ/': 'octopus',
  '/ō/': 'open',
  '/ö/': 'move',
  '/p/': 'pig',
  '/kw/': 'queen',
  '/r/': 'rabbit',
  '/z/': 'rose',
  '/t/': 'tiger',
  '/ŭ/': 'umbrella',
  '/ū/': 'unicorn',
  '/oo/': 'put',
  '/v/': 'van',
  '/w/': 'water',
  '/ks/': 'box',
  '/y/': 'yellow',
};

/**
 * Converts a phonics sound symbol to a word that demonstrates that sound
 */
export function soundToExampleWord(sound: string): string {
  // Remove any extra spaces
  const cleanSound = sound.trim();
  
  // Check if we have a direct mapping
  if (soundToWord[cleanSound]) {
    return soundToWord[cleanSound];
  }
  
  // If no direct mapping, try to extract from the sound format
  // For example, "/ă/" -> "ă" -> try to find a word
  const soundKey = cleanSound.replace(/[\/]/g, '');
  
  // Return the first example word from the letter data if available
  return '';
}

/**
 * Gets example words for a letter's sounds
 */
export function getLetterSoundWords(letter: string): string[] {
  const letterData = getLetterData(letter);
  if (!letterData) return [];
  
  // Use the example words from the letter data
  // These are already organized to match the sounds
  return letterData.examples || [];
}

/**
 * Gets the primary sound word for a letter (first example)
 */
export function getPrimarySoundWord(letter: string): string {
  const examples = getLetterSoundWords(letter);
  return examples[0] || letter.toLowerCase();
}

/**
 * Converts a sound symbol to a speakable word
 * Uses the example words from letter data
 */
export function getSoundWord(sound: string, letter: string): string {
  const letterData = getLetterData(letter);
  if (!letterData) return letter.toLowerCase();
  
  const sounds = letterData.sounds || [];
  const examples = letterData.examples || [];
  
  // Find the index of the sound
  const soundIndex = sounds.indexOf(sound);
  
  // Return the corresponding example word
  if (soundIndex >= 0 && examples[soundIndex]) {
    return examples[soundIndex];
  }
  
  // Fallback to first example or letter name
  return examples[0] || letter.toLowerCase();
}

