import { Values } from '@tim-mhn/common/objects';
import { ALL_DAYS_OF_WEEK, WEEK_DAY_MAP } from '../constants/days.constant';

export type DayOfWeek = typeof ALL_DAYS_OF_WEEK[number];

export type DayOfWeekNumber = Values<typeof WEEK_DAY_MAP>[number];
