import type { PhonicsHint } from '@/types';

const phonicsRules: Record<string, PhonicsHint> = {
  // Consonant sounds
  'c-before-a': {
    rule: 'C says /k/ before a, o, u',
    example: 'cat, cot, cup',
    tip: 'When C comes before a, o, or u, it makes the /k/ sound.',
  },
  'c-before-e': {
    rule: 'C says /s/ before e, i, y',
    example: 'cent, city, cycle',
    tip: 'When C comes before e, i, or y, it makes the /s/ sound.',
  },
  'g-before-a': {
    rule: 'G says /g/ before a, o, u',
    example: 'game, go, gun',
    tip: 'When G comes before a, o, or u, it usually makes the /g/ sound.',
  },
  'g-before-e': {
    rule: 'G says /j/ before e, i, y',
    example: 'gem, giant, gym',
    tip: 'When G comes before e, i, or y, it often makes the /j/ sound.',
  },
  // Vowel sounds
  'short-a': {
    rule: 'Short A says /ă/',
    example: 'cat, hat, bat',
    tip: 'Short A is the sound you hear in "cat".',
  },
  'short-e': {
    rule: 'Short E says /ĕ/',
    example: 'bed, red, pet',
    tip: 'Short E is the sound you hear in "bed".',
  },
  'short-i': {
    rule: 'Short I says /ĭ/',
    example: 'sit, hit, bit',
    tip: 'Short I is the sound you hear in "sit".',
  },
  'short-o': {
    rule: 'Short O says /ŏ/',
    example: 'hot, pot, dot',
    tip: 'Short O is the sound you hear in "hot".',
  },
  'short-u': {
    rule: 'Short U says /ŭ/',
    example: 'cup, sun, fun',
    tip: 'Short U is the sound you hear in "cup".',
  },
  // Common patterns
  'ck': {
    rule: 'CK says /k/ at the end of words',
    example: 'back, duck, stick',
    tip: 'CK always comes after a short vowel and makes the /k/ sound.',
  },
  'th': {
    rule: 'TH can say /th/ (voiced or unvoiced)',
    example: 'the, that, think',
    tip: 'TH makes a special sound. Try putting your tongue between your teeth.',
  },
  'sh': {
    rule: 'SH says /sh/',
    example: 'ship, fish, wish',
    tip: 'SH makes a quiet sound like "shhh".',
  },
  'ch': {
    rule: 'CH says /ch/',
    example: 'chat, much, rich',
    tip: 'CH makes the sound you hear at the start of "chair".',
  },
};

export function getPhonicsHint(word: string): PhonicsHint | null {
  const lowerWord = word.toLowerCase();

  // Check for specific patterns
  if (lowerWord.includes('ck')) {
    return phonicsRules['ck'];
  }
  if (lowerWord.includes('th')) {
    return phonicsRules['th'];
  }
  if (lowerWord.includes('sh')) {
    return phonicsRules['sh'];
  }
  if (lowerWord.includes('ch')) {
    return phonicsRules['ch'];
  }

  // Check first letter patterns
  const firstLetter = lowerWord[0];
  const secondLetter = lowerWord[1] || '';

  if (firstLetter === 'c') {
    if (['a', 'o', 'u'].includes(secondLetter)) {
      return phonicsRules['c-before-a'];
    }
    if (['e', 'i', 'y'].includes(secondLetter)) {
      return phonicsRules['c-before-e'];
    }
  }

  if (firstLetter === 'g') {
    if (['a', 'o', 'u'].includes(secondLetter)) {
      return phonicsRules['g-before-a'];
    }
    if (['e', 'i', 'y'].includes(secondLetter)) {
      return phonicsRules['g-before-e'];
    }
  }

  // Check for short vowel sounds
  if (lowerWord.includes('a') && lowerWord.length <= 4) {
    return phonicsRules['short-a'];
  }
  if (lowerWord.includes('e') && lowerWord.length <= 4) {
    return phonicsRules['short-e'];
  }
  if (lowerWord.includes('i') && lowerWord.length <= 4) {
    return phonicsRules['short-i'];
  }
  if (lowerWord.includes('o') && lowerWord.length <= 4) {
    return phonicsRules['short-o'];
  }
  if (lowerWord.includes('u') && lowerWord.length <= 4) {
    return phonicsRules['short-u'];
  }

  return null;
}

export function getPronunciationTip(word: string, isCorrect: boolean): string {
  if (isCorrect) {
    return 'Great job! You pronounced it correctly!';
  }

  const hint = getPhonicsHint(word);
  if (hint) {
    return `${hint.tip} Try: ${hint.example}`;
  }

  return `Try breaking the word into smaller parts. Sound out each letter or group of letters.`;
}

