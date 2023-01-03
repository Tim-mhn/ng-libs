import {
  nullOrUndefined,
  neitherNullNorUndefined,
} from '@tim-mhn/common/objects';
import { parseIntAndCatchNaN } from '@tim-mhn/common/strings';
import { InvalidTimeOfDayString } from '../errors/invalid-time-of-day-string.error';
import { TimeOfDayOutOfBounds } from '../errors/time-of-day-out-of-bounds.error';
import { DateDiff } from '../models/date-diff';
import { TimeOfDayFormat } from '../models/time-of-day-format';
import {
  convert12HFormatHourTo24HFormatHour,
  convert24HFormatHourTo12HFormatHour,
} from '../utils/hour-12-24-format.util';

export type TimeOfDayConstructorProps = Pick<DateDiff, 'hours' | 'minutes'>;

export class TimeOfDay {
  hours: number;
  minutes: number;

  private static readonly _12H_FORMAT_TIME_REGEX = /(\d+):(\d+) ?(am|pm)/i;

  private static MAX_HOUR = 23;
  private static MAX_MINUTE = 59;

  constructor(props: TimeOfDayConstructorProps) {
    this.hours = props.hours === undefined ? 0 : props.hours;
    this.minutes = props.minutes === undefined ? 0 : props.minutes;
  }

  public toString(format: TimeOfDayFormat = '24h') {
    return format === '12h'
      ? this._12HoursClockToString()
      : this._24HoursClockToString();
  }

  private _24HoursClockToString() {
    return `${this._numberToString(this.hours)}:${this._numberToString(
      this.minutes
    )}`;
  }

  private _12HoursClockToString() {
    const amOrPm = this.hours >= 12 ? 'PM' : 'AM';
    const hoursIn12HClock = convert24HFormatHourTo12HFormatHour(this.hours);
    return `${this._concatHoursMinsString(
      hoursIn12HClock,
      this.minutes
    )} ${amOrPm}`;
  }

  private _concatHoursMinsString(hours: number, minutes: number) {
    return `${this._numberToString(hours)}:${this._numberToString(minutes)}`;
  }

  private _numberToString(hoursOrMins: number) {
    if (nullOrUndefined(hoursOrMins) || Number.isNaN(hoursOrMins)) return '00';
    if (hoursOrMins < 10) return `0${hoursOrMins}`;
    return hoursOrMins.toString();
  }

  public isAfter(time: TimeOfDay) {
    return (
      this.hours > time?.hours ||
      (this.hours === time?.hours && this.minutes > time?.minutes)
    );
  }

  public static fromString(timeStr: string, format: TimeOfDayFormat = '24h') {
    if (!timeStr) return null;

    return format === '12h'
      ? this._from12HFormatString(timeStr)
      : this._from24HFormatString(timeStr);
  }

  private static _from24HFormatString(timeStr: string) {
    if (!timeStr) return null;

    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseIntAndCatchNaN(hoursStr);
    const minutes = parseIntAndCatchNaN(minutesStr);

    if (hours === null || minutes === null)
      throw new InvalidTimeOfDayString(timeStr);

    if (hours > TimeOfDay.MAX_HOUR || minutes > TimeOfDay.MAX_MINUTE)
      throw new TimeOfDayOutOfBounds(timeStr);

    return new TimeOfDay({
      hours,
      minutes,
    });
  }

  private static _from12HFormatString(timeStr: string): TimeOfDay {
    const matches = timeStr.match(this._12H_FORMAT_TIME_REGEX);
    const hasMatch = !!matches?.[0];
    if (!hasMatch) return null;

    const [hourStr, minuteStr, amOrPm] = matches.slice(1);

    const isMorning = amOrPm?.toLowerCase() === 'am';

    const hours = convert12HFormatHourTo24HFormatHour(
      Number.parseInt(hourStr),
      isMorning
    );
    const minutes = Number.parseInt(minuteStr);

    return new TimeOfDay({
      hours,
      minutes,
    });
  }

  public static startOfDay() {
    return new TimeOfDay({
      hours: 0,
      minutes: 0,
    });
  }

  public static endOfDay() {
    return new TimeOfDay({
      hours: TimeOfDay.MAX_HOUR,
      minutes: TimeOfDay.MAX_MINUTE,
    });
  }

  public isValid() {
    return (
      neitherNullNorUndefined(this.hours) &&
      neitherNullNorUndefined(this.minutes)
    );
  }

  public isEqual(time: TimeOfDay) {
    return this.hours === time?.hours && this.minutes === time?.minutes;
  }
  public isStartOfDay() {
    return this.isEqual(TimeOfDay.startOfDay());
  }

  public isEndOfDay() {
    return this.isEqual(TimeOfDay.endOfDay());
  }
}
