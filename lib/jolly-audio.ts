/**
 * Jolly Phonics audio file URLs from Jolly Kingdom
 * Base URL: https://www.jollykingdom.com/lettersounds/sound/
 * 
 * You can download the audio files locally using the script:
 * scripts/download-jolly-sounds.ps1
 * 
 * Local files will be used if available, otherwise remote URLs will be used
 */
const JOLLY_AUDIO_BASE_URL = 'https://www.jollykingdom.com/lettersounds/sound/';
const LOCAL_AUDIO_BASE_URL = '/sounds/';

/**
 * Mapping of letters/sounds to their audio file names
 * Based on the actual files available on Jolly Kingdom website
 */
export const jollyPhonicsAudioFiles: Record<string, string> = {
  // Group 1
  's': 's.mp3',
  'a': 'a.mp3',
  't': 't.mp3',
  'i': 'i.mp3',
  'p': 'p.mp3',
  'n': 'n.mp3',
  
  // Group 2
  'c': 'ck.mp3',
  'k': 'ck.mp3',
  'e': 'e.mp3',
  'h': 'h.mp3',
  'r': 'r.mp3',
  'm': 'm.mp3',
  'd': 'd.mp3',
  
  // Group 3
  'g': 'g.mp3',
  'o': 'o.mp3',
  'u': 'u.mp3',
  'l': 'l.mp3',
  'f': 'f.mp3',
  'b': 'b.mp3',
  
  // Group 4
  'ai': 'ai.mp3',
  'j': 'j.mp3',
  'oa': 'oa.mp3',
  'ie': 'ie.mp3',
  'ee': 'ee.mp3',
  'or': 'or.mp3',
  
  // Group 5
  'z': 'z.mp3',
  'w': 'w.mp3',
  'ng': 'ng.mp3',
  'v': 'v.mp3',
  'oo': 'moon.mp3', // Default to moon sound, can also use book.mp3
  'y': 'y.mp3',
  'x': 'x.mp3',
  
  // Group 6
  'ch': 'ch.mp3',
  'sh': 'sh.mp3',
  'th': 'three.mp3', // Unvoiced th, can also use this.mp3 for voiced
  
  // Group 7
  'qu': 'qu.mp3',
  'ou': 'ou.mp3',
  'oi': 'oi.mp3',
  'ue': 'ue.mp3',
  'er': 'er.mp3',
  'ar': 'ar.mp3',
};

/**
 * Get the audio file URL for a letter/sound
 * Tries local file first, falls back to remote URL
 */
export function getJollyPhonicsAudioUrl(letter: string, useLocal: boolean = true): string | null {
  const lowerLetter = letter.toLowerCase();
  const fileName = jollyPhonicsAudioFiles[lowerLetter];
  
  if (!fileName) {
    return null;
  }
  
  // Try local file first if useLocal is true
  if (useLocal) {
    return `${LOCAL_AUDIO_BASE_URL}${fileName}`;
  }
  
  // Fallback to remote URL
  return `${JOLLY_AUDIO_BASE_URL}${fileName}`;
}

/**
 * Get remote audio URL (for downloading or fallback)
 */
export function getJollyPhonicsRemoteUrl(letter: string): string | null {
  const lowerLetter = letter.toLowerCase();
  const fileName = jollyPhonicsAudioFiles[lowerLetter];
  
  if (!fileName) {
    return null;
  }
  
  return `${JOLLY_AUDIO_BASE_URL}${fileName}`;
}

/**
 * Play Jolly Phonics audio file
 * Tries local first, then remote
 */
export function playJollyPhonicsAudio(letter: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const localUrl = getJollyPhonicsAudioUrl(letter, true);
    const remoteUrl = getJollyPhonicsAudioUrl(letter, false);
    
    if (!localUrl && !remoteUrl) {
      reject(new Error(`No audio file found for letter: ${letter}`));
      return;
    }
    
    const audio = new Audio(localUrl || remoteUrl!);
    audio.crossOrigin = 'anonymous';
    
    const tryRemote = () => {
      if (remoteUrl && audio.src !== remoteUrl) {
        audio.src = remoteUrl;
        audio.load();
        audio.play().catch(reject);
      } else {
        reject(new Error('Failed to load audio'));
      }
    };
    
    audio.onended = () => resolve();
    audio.onerror = () => {
      // If local failed, try remote
      if (localUrl && remoteUrl) {
        tryRemote();
      } else {
        reject(new Error('Failed to load audio'));
      }
    };
    
    audio.play().catch(() => {
      // If play failed, try remote if available
      if (localUrl && remoteUrl) {
        tryRemote();
      } else {
        reject(new Error('Failed to play audio'));
      }
    });
  });
}

/**
 * Check if audio file exists for a letter
 */
export function hasJollyPhonicsAudio(letter: string): boolean {
  return getJollyPhonicsAudioUrl(letter) !== null;
}

