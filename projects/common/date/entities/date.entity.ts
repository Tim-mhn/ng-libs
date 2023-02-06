import { DateTime } from 'luxon';
import { AbstractDate } from '../models/abtract-date';
import { DateDiff } from '../models/date-diff';
import { DayOfWeekNumber } from '../models/day-of-week';

export class TimDate extends AbstractDate {
  private constructor(_luxonDate: DateTime) {
    super();
    this._luxonDate = _luxonDate;
    this._setDateParts();
  }

  private _luxonDate: DateTime;

  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;

  get timezone(): string {
    return this._luxonDate.zoneName;
  }
  private _setDateParts() {
    this.year = this._luxonDate.year;
    this.month = this._luxonDate.month;
    this.day = this._luxonDate.day;
    this.hour = this._luxonDate.hour;
    this.minute = this._luxonDate.minute;
    this.second = this._luxonDate.second;
    this.millisecond = this._luxonDate.millisecond;
  }

  public static override now(): TimDate {
    return new TimDate(DateTime.now());
  }

  public toFormat(format: string): string {
    return this._luxonDate.toFormat(format);
  }

  public static override fromISO(iso: string, timezone?: string) {
    const _luxonDate = timezone
      ? TimDate._timezoneLuxonDateIfValid(iso, timezone)
      : DateTime.fromISO(iso);

    if (!_luxonDate.isValid)
      console.debug('Invalid iso string to build TimDate : ', iso);

    return new TimDate(_luxonDate);
  }

  private static _timezoneLuxonDateIfValid(iso: string, timezone?: string) {
    const luxonDate = DateTime.fromISO(iso, { zone: timezone });
    if (!luxonDate.isValid) {
      const dateWithoutTz = DateTime.fromISO(iso);
      if (dateWithoutTz.isValid) {
        console.debug(`${timezone} is not a valid timezone`);
        return dateWithoutTz;
      }
    }
    return luxonDate;
  }

  public toISO(): string {
    return this._luxonDate.toISO();
  }

  public diff(date: TimDate): DateDiff {
    return this._luxonDate
      .diff(date._luxonDate, ['years', 'months', 'days'])
      .toObject();
  }

  public plus(diff: DateDiff) {
    const _luxonPlus = this._luxonDate.plus(diff);
    return new TimDate(_luxonPlus);
  }
  public minus(diff: DateDiff) {
    const _luxonMinus = this._luxonDate.minus(diff);
    return new TimDate(_luxonMinus);
  }

  public setTimezone(tz: string) {
    const _newTzDate = this._luxonDate.setZone(tz);
    return new TimDate(_newTzDate);
  }

  public isLastDayOfMonth(): boolean {
    return this.day === DateTime.local(this.year, this.month).daysInMonth;
  }

  public getDayOfWeek(): DayOfWeekNumber {
    return this._luxonDate.weekday;
  }

  public toUTC(): DateTime {
    return this._luxonDate.toUTC();
  }
  public get daysInMonth(): number {
    const numOfDaysInMonth = DateTime.local(this.year, this.month).daysInMonth;
    return numOfDaysInMonth;
  }

  public startOf(unit: 'week' | 'month' | 'day') {
    const startOfDate = DateTime.local(this.year, this.month).startOf(unit);
    return new TimDate(startOfDate);
  }

  public endOf(unit: 'week' | 'month') {
    const endOfDate = DateTime.local(this.year, this.month).endOf(unit);
    return new TimDate(endOfDate);
  }

  public static override local(year?: number, month?: number, day?: number) {
    const date = DateTime.local(year, month, day);
    return new TimDate(date);
  }

  public toLocal() {
    const date = DateTime.local(this.year, this.month, this.day, {
      zone: 'utc',
    });
    return new TimDate(date);
  }

  public equals(otherDate: TimDate, opt = { ignoreTime: false }) {
    const date1 = opt.ignoreTime ? this._removeTime(this) : this;
    const date2 = opt.ignoreTime ? this._removeTime(otherDate) : otherDate;
    return date1._luxonDate.equals(date2._luxonDate);
  }

  public toMillis() {
    return this._luxonDate.toMillis();
  }

  public isAfter(compareDate: TimDate, opt = { ignoreTime: false }) {
    if (compareDate) {
      const date1 = opt.ignoreTime ? this._removeTime(this) : this;
      const date2 = opt.ignoreTime
        ? this._removeTime(compareDate)
        : compareDate;
      return date1.toMillis() > date2.toMillis();
    }
    return false;
  }

  private _removeTime(date: TimDate) {
    const { year, month, day } = date;
    return TimDate.local(year, month, day);
  }
}
