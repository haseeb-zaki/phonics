import type { JollyPhonicsData, JollyPhonicsAction, JollyPhonicsGroup } from '@/types';
import jollyPhonicsData from '@/data/jolly-phonics.json';

const jollyData = jollyPhonicsData as JollyPhonicsData;

export function getJollyPhonicsAction(letter: string): JollyPhonicsAction | null {
  const lowerLetter = letter.toLowerCase();
  return jollyData.actions[lowerLetter] || null;
}

export function getAllJollyPhonicsGroups(): JollyPhonicsGroup[] {
  return jollyData.groups;
}

export function getJollyPhonicsGroup(groupNumber: number): JollyPhonicsGroup | null {
  return jollyData.groups.find(g => g.group === groupNumber) || null;
}

export function getLettersInGroup(groupNumber: number): string[] {
  const group = getJollyPhonicsGroup(groupNumber);
  return group?.letters || [];
}

export function getGroupForLetter(letter: string): number | null {
  const lowerLetter = letter.toLowerCase();
  for (const group of jollyData.groups) {
    if (group.letters.includes(lowerLetter)) {
      return group.group;
    }
  }
  return null;
}

export function hasJollyPhonicsAction(letter: string): boolean {
  return getJollyPhonicsAction(letter) !== null;
}

export function getJollyPhonicsOrder(): string[] {
  const allLetters: string[] = [];
  for (const group of jollyData.groups) {
    allLetters.push(...group.letters);
  }
  return allLetters;
}

