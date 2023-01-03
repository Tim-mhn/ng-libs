import { DateDiff } from './date-diff';

/* eslint-disable no-use-before-define */
export abstract class AbstractDate {
  abstract year: number;
  abstract month: number;
  abstract day: number;
  abstract minute: number;
  abstract second: number;
  abstract millisecond: number;
  abstract toFormat(format: string): string;
  static now: () => AbstractDate;
  static fromISO: (iso: string, timezone?: string) => AbstractDate;
  abstract toISO(opts: {}): string;
  abstract diff(date: AbstractDate): DateDiff;
  abstract plus(diff: DateDiff): AbstractDate;
  abstract setTimezone(tz: string): AbstractDate;
  abstract get timezone(): string;
  abstract get daysInMonth(): number;
  abstract startOf(unit: 'week' | 'month'): AbstractDate;
  abstract endOf(unit: 'week' | 'month'): AbstractDate;
  static local: (year?: number, month?: number, day?: number) => AbstractDate;
  abstract equals(otherDate: AbstractDate): boolean;
  abstract toMillis(): number;
  abstract isAfter(compareDate: AbstractDate): boolean;
}
