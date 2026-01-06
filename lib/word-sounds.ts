import { getJollyPhonicsSound } from './jolly-sounds';
import { getJollyPhonicsAction } from './jolly-phonics';
import { playJollyPhonicsAudio, hasJollyPhonicsAudio } from './jolly-audio';

/**
 * Break down a word into individual Jolly Phonics sounds
 * Returns an array of sound letters that make up the word
 */
export function breakWordIntoSounds(word: string): string[] {
  if (!word || word.length === 0) {
    return [];
  }

  const lowerWord = word.toLowerCase();
  const sounds: string[] = [];
  let i = 0;

  while (i < lowerWord.length) {
    let matched = false;

    // Try to match digraphs first (2-letter combinations)
    // This handles sounds like 'ch', 'sh', 'th', 'ai', 'ee', etc.
    if (i < lowerWord.length - 1) {
      const digraph = lowerWord.substring(i, i + 2);
      // Check if this digraph is a Jolly Phonics sound AND has audio
      if (getJollyPhonicsAction(digraph) && hasJollyPhonicsAudio(digraph)) {
        sounds.push(digraph);
        i += 2;
        matched = true;
      }
    }

    // If no digraph match, try single letter
    if (!matched) {
      const char = lowerWord[i];
      // Only include letters that have Jolly Phonics sounds AND audio files
      // This ensures we only use Jolly Phonics letter sounds, not letter names
      if (getJollyPhonicsAction(char) && hasJollyPhonicsAudio(char)) {
        sounds.push(char);
        i++;
        matched = true;
      } else {
        // Skip letters that don't have Jolly Phonics sounds or audio
        // This ensures we only use Jolly Phonics letter sounds for word pronunciation
        i++;
      }
    }
  }

  // Return empty array if no valid Jolly Phonics sounds were found
  // This ensures words can only be played if they contain valid Jolly Phonics sounds
  return sounds;
}

/**
 * Play a word by breaking it into sounds and playing each sound sequentially
 */
export async function playWordBySounds(word: string): Promise<void> {
  const sounds = breakWordIntoSounds(word);
  
  if (sounds.length === 0) {
    throw new Error(`Cannot break down word "${word}" into Jolly Phonics sounds`);
  }

  // Play each sound with a small delay between them
  for (let i = 0; i < sounds.length; i++) {
    await playJollyPhonicsAudio(sounds[i]);
    // Small pause between sounds (except after the last one)
    if (i < sounds.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
}

/**
 * Get the sound breakdown of a word as a string
 * e.g., "bad" -> "b-a-d"
 */
export function getWordSoundBreakdown(word: string): string {
  const sounds = breakWordIntoSounds(word);
  return sounds.join('-');
}

