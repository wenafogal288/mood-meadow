import { useCallback, useState } from 'react';
import type { Entry } from '../game/insights';
import { averageScore, streakOf, weekSlice } from '../game/insights';
import type { MoodId } from '../game/moods';
import { moodById } from '../game/moods';
import { addDays, dateKey } from '../utils/date';

interface SeedRow {
  back: number;
  moodId: MoodId;
  tags: string[];
  note: string;
}

const SEED: SeedRow[] = [
  { back: 1, moodId: 'calm', tags: ['QUIET', 'REST'], note: 'Felt steady' },
  { back: 2, moodId: 'steady', tags: ['WORK'], note: '' },
  { back: 3, moodId: 'radiant', tags: ['OUTSIDE', 'PEOPLE'], note: 'Good company' },
  { back: 4, moodId: 'low', tags: ['WORK', 'BODY'], note: 'Needed rest' },
  { back: 5, moodId: 'calm', tags: ['QUIET'], note: '' },
  { back: 6, moodId: 'steady', tags: ['OUTSIDE'], note: '' },
];

function buildSeed(today: Date): Entry[] {
  return SEED.map(row => {
    const d = addDays(today, -row.back);
    return {
      key: dateKey(d),
      moodId: row.moodId,
      score: moodById(row.moodId).score,
      tags: row.tags.slice(),
      note: row.note,
    };
  });
}

export interface EntriesApi {
  entries: Entry[];
  today: Date;
  todayEntry: Entry | null;
  lastEntry: Entry | null;
  saveEntry: (moodId: MoodId, tags: string[], note: string) => Entry;
  week: ReturnType<typeof weekSlice>;
  avg: number;
  streak: number;
  clearAll: () => void;
}

export function useEntries(): EntriesApi {
  // Built lazily inside the initialiser so nothing heavy runs at module load.
  const [today] = useState<Date>(() => new Date());
  const [entries, setEntries] = useState<Entry[]>(() => buildSeed(new Date()));

  const saveEntry = useCallback(
    (moodId: MoodId, tags: string[], note: string): Entry => {
      const entry: Entry = {
        key: dateKey(today),
        moodId,
        score: moodById(moodId).score,
        tags: tags.slice(0, 3),
        note,
      };
      setEntries(prev => {
        const rest = prev.filter(e => e.key !== entry.key);
        return [entry, ...rest];
      });
      return entry;
    },
    [today],
  );

  const clearAll = useCallback(() => setEntries([]), []);

  const todayKey = dateKey(today);
  const todayEntry = entries.find(e => e.key === todayKey) || null;
  const lastEntry = entries.length > 0 ? entries[0] : null;

  return {
    entries,
    today,
    todayEntry,
    lastEntry,
    saveEntry,
    week: weekSlice(entries, today),
    avg: averageScore(entries),
    streak: streakOf(entries, today),
    clearAll,
  };
}

export default useEntries;
