import { TimeUnit } from './time-unit';

export type DateDiff = {
  [unit in TimeUnit]?: number;
};
