import { IQAirDate } from './date.entity';
import {
  DATETIME_FULL,
  DATETIME_WITHOUT_YEAR,
  DATE_FULL,
} from '../constants/date-time-format.constants';

describe('IQAirDate', () => {
  it('should be possible to create it from .now', () => {
    const date = IQAirDate.now();
    expect(date).toBeDefined();
  });

  describe('fromISO', () => {
    it('should be possible to create a Date using .fromISO', () => {
      const isoString = '2011-10-05T14:48:00.000Z';
      const date = IQAirDate.fromISO(isoString, 'Etc/UCT');
      expect(date).toBeDefined();
    });

    it('should log a debug message when using an invalid iso', () => {
      const invalidISO = '2011-10-05T26:48:00.000Z';
      spyOn(console, 'debug');

      IQAirDate.fromISO(invalidISO);
      expect(console.debug).toHaveBeenCalled();
    });

    it('should log a debug message when using an invalid timezone', () => {
      const iso = '2011-10-05T23:48:00.000Z';
      const invalidTz = 'not a timezone';
      spyOn(console, 'debug');

      IQAirDate.fromISO(iso, invalidTz);
      expect(console.debug).toHaveBeenCalled();
    });
  });

  describe('toFormat', () => {
    it('should show month, day and year when using DATE_FULL format', () => {
      const format = DATE_FULL;
      const isoString = '2011-10-05T14:48:00.000Z';
      const date = IQAirDate.fromISO(isoString, 'Etc/UCT');
      expect(date.toFormat(format)).toEqual('Oct 5, 2011');
    });

    it('should show time, month, day and year when using DATE_FULL format', () => {
      const format = DATETIME_FULL;
      const isoString = '2014-10-09T21:58:00.000Z';
      const date = IQAirDate.fromISO(isoString, 'Etc/UCT');

      expect(date.toFormat(format)).toEqual('21:58, Oct 9, 2014');
    });

    it('should show time, month, day DATETIME_WITHOUT_YEAR format', () => {
      const format = DATETIME_WITHOUT_YEAR;
      const isoString = '2002-10-09T21:58:00.000Z';
      const date = IQAirDate.fromISO(isoString, 'Etc/UCT');
      expect(date.toFormat(format)).toEqual('21:58, Oct 9');
    });
  });

  describe('diff', () => {
    it('should return the round number of years between the 2 dates', () => {
      const _2002 = IQAirDate.fromISO('2002-10-09T21:58:00.000Z', 'Etc/UCT');
      const _2012 = IQAirDate.fromISO('2012-12-09T21:58:00.000Z', 'Etc/UCT');

      expect(_2012.diff(_2002).years).toEqual(10);
    });

    it('should return a negative number of years if the first date is before the second one', () => {
      const _2002 = IQAirDate.fromISO('2002-12-09T21:58:00.000Z', 'Etc/UCT');
      const _2012 = IQAirDate.fromISO('2012-12-09T21:58:00.000Z', 'Etc/UCT');

      expect(_2002.diff(_2012).years).toEqual(-10);
    });

    it('should return the number of months between the 2 dates after removing the difference in years', () => {
      const october_9 = IQAirDate.fromISO(
        '2002-10-09T21:58:00.000Z',
        'Etc/UCT'
      ); // october
      const december_9 = IQAirDate.fromISO(
        '2002-12-09T21:58:00.000Z',
        'Etc/UCT'
      );

      expect(december_9.diff(october_9).months).toEqual(2);
    });

    it('should return a difference of 1 month if the 2 dates have a month difference of 2 but the first date"s date is superior the other date"s', () => {
      const october_10 = IQAirDate.fromISO(
        '2002-10-10T21:58:00.000Z',
        'Etc/UCT'
      ); // october
      const december_9 = IQAirDate.fromISO(
        '2012-12-09T21:58:00.000Z',
        'Etc/UCT'
      );

      expect(december_9.diff(october_10).months).toEqual(1);
    });
  });

  describe('plus', () => {
    it('should return a new date object and not edit the input date', () => {
      const october_10 = IQAirDate.fromISO(
        '2002-10-10T21:58:00.000Z',
        'Etc/UCT'
      ); // october

      const plusDate = october_10.plus({
        years: 1,
      });

      expect(plusDate).not.toBe(october_10);
      expect(october_10.year).toEqual(2002);
    });

    it('should return a new date with one additional year and the same month / day', () => {
      const october_10 = IQAirDate.fromISO(
        '2002-10-12T21:58:00.000Z',
        'Etc/UCT'
      ); // october

      const plusDate = october_10.plus({
        years: 1,
      });

      expect(plusDate.year).toEqual(2003);
      expect(plusDate.month).toEqual(10);
      expect(plusDate.day).toEqual(12);
    });

    it('should work with negative numbers', () => {
      const october_10 = IQAirDate.fromISO(
        '2002-10-12T21:58:00.000Z',
        'Etc/UCT'
      ); // october

      const plusDate = october_10.plus({
        years: -2,
      });

      expect(plusDate.year).toEqual(2000);
      expect(plusDate.month).toEqual(10);
      expect(plusDate.day).toEqual(12);
    });

    it('should work with days', () => {
      const october_10 = IQAirDate.fromISO(
        '2002-10-12T21:58:00.000Z',
        'Etc/UCT'
      ); // october

      const plusDate = october_10.plus({
        days: 13,
      });

      expect(plusDate.year).toEqual(2002);
      expect(plusDate.month).toEqual(10);
      expect(plusDate.day).toEqual(25);
    });
  });

  describe('timezone', () => {
    it('toFormat should display the date and time considering the right timezone', () => {
      const isoStringUTC = '2007-10-12T15:48:00.000Z'; // 'Z' ensures we are in UTC timezone
      const NY_tz = 'America/New_York';
      const date = IQAirDate.fromISO(isoStringUTC, NY_tz);

      const dateString = date.toFormat(DATETIME_FULL);

      expect(dateString).toEqual('11:48, Oct 12, 2007'); // -4h compared to UTC
    });
  });
});
