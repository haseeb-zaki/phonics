/**
 * Jolly Phonics pure sound pronunciations
 * These are the exact sounds children learn in Jolly Phonics
 */
export const jollyPhonicsSounds: Record<string, string> = {
  // Group 1
  's': 'sss',
  'a': 'aaa',
  't': 'ttt',
  'i': 'iii',
  'p': 'ppp',
  'n': 'nnn',
  
  // Group 2
  'c': 'ck',
  'k': 'ck',
  'e': 'eh',
  'h': 'hhh',
  'r': 'rrr',
  'm': 'mmm',
  'd': 'ddd',
  
  // Group 3
  'g': 'ggg',
  'o': 'oh',
  'u': 'uh',
  'l': 'lll',
  'f': 'fff',
  'b': 'bbb',
  
  // Group 4
  'ai': 'ay',
  'j': 'jjj',
  'oa': 'oh',
  'ie': 'eye',
  'ee': 'eee',
  'or': 'or',
  
  // Group 5
  'z': 'zzz',
  'w': 'wh',
  'ng': 'ng',
  'v': 'vvv',
  'oo': 'oo', // can be as in book or moon
  
  // Group 6
  'y': 'yyy',
  'x': 'ks',
  'ch': 'ch',
  'sh': 'sh',
  'th': 'th', // can be unvoiced (think) or voiced (that)
  
  // Group 7
  'qu': 'kw',
  'ou': 'ow',
  'oi': 'oy',
  'ue': 'yoo',
  'er': 'er',
  'ar': 'ar',
};

/**
 * Get the pure Jolly Phonics sound for a letter
 */
export function getJollyPhonicsSound(letter: string): string {
  const lowerLetter = letter.toLowerCase();
  return jollyPhonicsSounds[lowerLetter] || lowerLetter;
}

/**
 * Get all sounds for a letter (some letters have multiple sounds)
 */
export function getAllJollyPhonicsSounds(letter: string): string[] {
  const lowerLetter = letter.toLowerCase();
  const sound = jollyPhonicsSounds[lowerLetter];
  
  if (!sound) return [lowerLetter];
  
  // Handle special cases
  if (lowerLetter === 'th') {
    return ['th', 'th']; // unvoiced and voiced
  }
  if (lowerLetter === 'oo') {
    return ['oo', 'oo']; // book and moon
  }
  
  return [sound];
}

/**
 * Speak the pure Jolly Phonics sound
 * This is the sound children learn, not the letter name
 */
export function speakJollyPhonicsSound(letter: string, options?: { rate?: number; pitch?: number }): Promise<void> {
  const sound = getJollyPhonicsSound(letter);
  
  // Import speakText dynamically to avoid circular dependencies
  return import('./speech').then(({ speakText }) => {
    return speakText(sound, {
      rate: options?.rate ?? 0.8,
      pitch: options?.pitch ?? 1.0,
      volume: 1.0,
      lang: 'en-US',
    });
  });
}

