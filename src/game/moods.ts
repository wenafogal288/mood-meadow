import type { ImageSourcePropType } from 'react-native';
import {
  moodCalm,
  moodLow,
  moodRadiant,
  moodSteady,
  moodStorm,
} from '../assets';

export type MoodId = 'radiant' | 'calm' | 'steady' | 'low' | 'storm';

export interface Mood {
  id: MoodId;
  label: string;
  score: number;
  color: string;
  sprite: ImageSourcePropType;
}

export const MOODS: Mood[] = [
  { id: 'radiant', label: 'RADIANT', score: 5, color: '#E9C46A', sprite: moodRadiant },
  { id: 'calm', label: 'CALM', score: 4, color: '#6A8E5E', sprite: moodCalm },
  { id: 'steady', label: 'STEADY', score: 3, color: '#96B27C', sprite: moodSteady },
  { id: 'low', label: 'LOW', score: 2, color: '#8A9A7B', sprite: moodLow },
  { id: 'storm', label: 'STORM', score: 1, color: '#D97B4D', sprite: moodStorm },
];

export const DEFAULT_MOOD: MoodId = 'calm';

export function moodById(id: MoodId): Mood {
  const found = MOODS.find(m => m.id === id);
  return found ? found : MOODS[1];
}

export function moodByScore(score: number): Mood {
  let best = MOODS[1];
  let delta = 99;
  for (const m of MOODS) {
    const d = Math.abs(m.score - score);
    if (d < delta) {
      delta = d;
      best = m;
    }
  }
  return best;
}

export const TAGS = ['REST', 'WORK', 'PEOPLE', 'OUTSIDE', 'BODY', 'QUIET'];

export const NOTE_LINES = ['Felt steady', 'Needed rest', 'Good company'];
