import type { MoodId } from './moods';
import { moodById } from './moods';
import { dateKey, weekDates } from '../utils/date';

export interface Entry {
  key: string;
  moodId: MoodId;
  score: number;
  tags: string[];
  note: string;
}

export interface DayCell {
  label: string;
  score: number;
  isToday: boolean;
}

export function weekSlice(entries: Entry[], today: Date): DayCell[] {
  const todayKey = dateKey(today);
  const labels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return weekDates(today).map((d, i) => {
    const k = dateKey(d);
    const hit = entries.find(e => e.key === k);
    return {
      label: labels[i],
      score: hit ? hit.score : 0,
      isToday: k === todayKey,
    };
  });
}

export function averageScore(entries: Entry[]): number {
  if (entries.length === 0) {
    return 0;
  }
  const sum = entries.reduce((acc, e) => acc + e.score, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

/** Consecutive days with an entry, counting back from today. */
export function streakOf(entries: Entry[], today: Date): number {
  const keys = new Set(entries.map(e => e.key));
  let n = 0;
  const cursor = new Date(today.getTime());
  for (let i = 0; i < 60; i += 1) {
    if (!keys.has(dateKey(cursor))) {
      break;
    }
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function headlineFor(score: number): string {
  if (score >= 4) {
    return 'BRIGHT DAY!';
  }
  if (score === 3) {
    return 'STEADY DAY.';
  }
  return 'HEAVY DAY.';
}

export function headlineColor(score: number): string {
  if (score >= 4) {
    return '#6A8E5E';
  }
  if (score === 3) {
    return '#283618';
  }
  return '#9B6B3F';
}

export function insightFor(entries: Entry[], avg: number): string {
  if (entries.length === 0) {
    return 'Your week starts here.';
  }
  const counts: Record<string, number> = {};
  for (const e of entries) {
    for (const t of e.tags) {
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  const top = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 2);
  if (top.length === 2) {
    return `Brighter days cluster around ${top[0]} and ${top[1]}.`;
  }
  if (top.length === 1) {
    return `${top[0]} keeps showing up in your better days.`;
  }
  return avg >= 3.5 ? 'A gentle, even week so far.' : 'Give this week a slower pace.';
}

export function moodLabelFor(id: MoodId): string {
  return moodById(id).label;
}
