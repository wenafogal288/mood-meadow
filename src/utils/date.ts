export const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export function dateKey(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d.getTime());
  copy.setDate(copy.getDate() + n);
  return copy;
}

/** 0 = Monday … 6 = Sunday */
export function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}

export function shortDate(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function weekdayLabel(d: Date): string {
  return DAY_LABELS[mondayIndex(d)];
}

/** Monday..Sunday of the week containing `d`. */
export function weekDates(d: Date): Date[] {
  const start = addDays(d, -mondayIndex(d));
  const out: Date[] = [];
  for (let i = 0; i < 7; i += 1) {
    out.push(addDays(start, i));
  }
  return out;
}
