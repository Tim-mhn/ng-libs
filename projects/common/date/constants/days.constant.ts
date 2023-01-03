import { objectKeys } from '@tim-mhn/common/objects';
import { DayOfWeek } from '../models/day-of-week';

export const WEEK_DAY_MAP = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
} as const;

export const ALL_DAYS_OF_WEEK = objectKeys(WEEK_DAY_MAP);

export const WEEK_DAYS: Readonly<DayOfWeek[]> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
] as const;

export const WEEKEND_DAYS = ['saturday', 'sunday'] as const;
