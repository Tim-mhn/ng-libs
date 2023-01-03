import { InvalidTimeOfDayString } from '../errors/invalid-time-of-day-string.error';
import { TimeOfDayOutOfBounds } from '../errors/time-of-day-out-of-bounds.error';
import { TimeOfDayFormat } from '../models/time-of-day-format';
import { TimeOfDay, TimeOfDayConstructorProps } from './time-of-day.entity';

describe('TimeOfDay', () => {
  describe('constructor', () => {
    it('hours equals to 0 by default', () => {
      const timeOfDay = new TimeOfDay({ minutes: 1 });
      expect(timeOfDay.hours).toEqual(0);
    });

    it('minutes equals to 0 by default', () => {
      const timeOfDay = new TimeOfDay({ hours: 9 });
      expect(timeOfDay.minutes).toEqual(0);
    });

    it('hours equals to 0 when passing hours: undefined', () => {
      const timeOfDay = new TimeOfDay({ hours: undefined });
      expect(timeOfDay.hours).toEqual(0);
    });

    it('hours equals to null when passing hours:null', () => {
      const timeOfDay = new TimeOfDay({ hours: null });
      expect(timeOfDay.hours).toEqual(null);
    });
  });

  describe('from string', () => {
    it('should properly transform a valid time string', () => {
      const timeString = '12:50';

      const timeOfDay = TimeOfDay.fromString(timeString);

      expect(timeOfDay.minutes).toEqual(50);
      expect(timeOfDay.hours).toEqual(12);
    });

    it('should properly transform a valid time string 2', () => {
      const timeString = '12:50';

      const timeOfDay = TimeOfDay.fromString(timeString);

      expect(timeOfDay.minutes).toEqual(50);
      expect(timeOfDay.hours).toEqual(12);
    });

    it('should throw an InvalidTimeOfDayString error if the string does not match the h(h):m(m) format', () => {
      const invalidString = 'cpjacj';

      const timeOfDayFn = () => TimeOfDay.fromString(invalidString);

      expect(timeOfDayFn).toThrow(new InvalidTimeOfDayString(invalidString));
    });

    describe('12h format', () => {
      it('should correctly transform a morning time string', () => {
        const morningTime = '03:20 AM';
        const timeOfDay = TimeOfDay.fromString(morningTime, '12h');
        expect(timeOfDay.hours).toEqual(3);
        expect(timeOfDay.minutes).toEqual(20);
      });

      it('should correctly transform an afternoon time string', () => {
        const afternoonTime = '4:28 PM';
        const timeOfDay = TimeOfDay.fromString(afternoonTime, '12h');
        expect(timeOfDay.hours).toEqual(16);
        expect(timeOfDay.minutes).toEqual(28);
      });

      it('should transform 12:00 am to { hours: 0, minutes : 0 }', () => {
        const noon = '12:00 am';
        const timeOfDay = TimeOfDay.fromString(noon, '12h');
        expect(timeOfDay.hours).toEqual(0);
        expect(timeOfDay.minutes).toEqual(0);
      });

      it('should transform 12:00 PM to { hours: 12, minutes : 0 }', () => {
        const midnight = '12:00 PM';
        const timeOfDay = TimeOfDay.fromString(midnight, '12h');
        expect(timeOfDay.hours).toEqual(12);
        expect(timeOfDay.minutes).toEqual(0);
      });
    });

    it('should throw an TimeOfDayOutOfBounds error if the hours are strictly superior to 23', () => {
      const hoursOutOfBoundsStr = '24:12';

      const timeOfDayFn = () => TimeOfDay.fromString(hoursOutOfBoundsStr);

      expect(timeOfDayFn).toThrow(
        new TimeOfDayOutOfBounds(hoursOutOfBoundsStr)
      );
    });
  });

  describe('toString()', () => {
    it('should return the hours & minutes as string when hours and minutes >= 10', () => {
      const time = new TimeOfDay({
        hours: 12,
        minutes: 59,
      });

      expect(time.toString()).toEqual('12:59');
    });

    it('should precede hours with 0 if hours < 10', () => {
      const time = new TimeOfDay({
        hours: 8,
        minutes: 59,
      });

      expect(time.toString()).toEqual('08:59');
    });

    it('should precede minutes with 0 if minutes < 10', () => {
      const time = new TimeOfDay({
        hours: 18,
        minutes: 2,
      });

      expect(time.toString()).toEqual('18:02');
    });

    it('should return 00 for hours if hours are undefined', () => {
      const time = new TimeOfDay({
        minutes: 12,
      } as TimeOfDayConstructorProps);

      expect(time.toString()).toEqual('00:12');
    });

    it('should return 00 for minutes if minutes are undefined', () => {
      const time = new TimeOfDay({
        hours: 12,
      } as TimeOfDayConstructorProps);

      expect(time.toString()).toEqual('12:00');
    });

    describe('12h format', () => {
      it('should return "07:10 AM" when hours=7, minutes=10', () => {
        const time = new TimeOfDay({
          hours: 7,
          minutes: 15,
        });

        expect(time.toString('12h')).toEqual('07:15 AM');
      });

      it('should return "01:45 PM" when hours=13, minutes=45', () => {
        const time = new TimeOfDay({
          hours: 13,
          minutes: 45,
        });

        expect(time.toString('12h')).toEqual('01:45 PM');
      });

      it('should return "12:00 PM" when hours=12, minutes=0', () => {
        const time = new TimeOfDay({
          hours: 12,
          minutes: 0,
        });

        expect(time.toString('12h')).toEqual('12:00 PM');
      });

      it('should return "12:05 AM" when hours=00, minutes=5', () => {
        const time = new TimeOfDay({
          hours: 0,
          minutes: 5,
        });

        expect(time.toString('12h')).toEqual('12:05 AM');
      });
    });
  });

  describe('isAfter', () => {
    it('should mark TimeOfDay1 as after TimeOfDay2 if TimeOfDay1.hours > TimeOfDay2.hours', () => {
      const timeOfDay1 = new TimeOfDay({
        hours: 4,
        minutes: 2,
      });

      const timeOfDay2 = new TimeOfDay({
        hours: 2,
        minutes: 40,
      });

      expect(timeOfDay1.isAfter(timeOfDay2)).toBeTrue();
    });

    it('should mark TimeOfDay1 as after TimeOfDay2 if TimeOfDay1.hours = TimeOfDay2.hours and TimeOfDay1.minutes  > TimeOfDay2.minutes', () => {
      const timeOfDay1 = new TimeOfDay({
        hours: 4,
        minutes: 42,
      });

      const timeOfDay2 = new TimeOfDay({
        hours: 4,
        minutes: 40,
      });

      expect(timeOfDay1.isAfter(timeOfDay2)).toBeTrue();
    });

    it('should not mark TimeOfDay1 as after TimeOfDay2 if TimeOfDay1.hours = TimeOfDay2.hours and TimeOfDay1.minutes =  TimeOfDay2.minutes', () => {
      const timeOfDay1 = new TimeOfDay({
        hours: 4,
        minutes: 42,
      });

      const timeOfDay2 = new TimeOfDay({
        hours: 4,
        minutes: 42,
      });

      expect(timeOfDay1.isAfter(timeOfDay2)).toBeFalse();
    });

    it('should not mark TimeOfDay1 as after TimeOfDay2 if TimeOfDay2 is null', () => {
      const timeOfDay1 = new TimeOfDay({
        hours: 4,
        minutes: 42,
      });

      expect(timeOfDay1.isAfter(null)).toBeFalse();
    });
  });
});
