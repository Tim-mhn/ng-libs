import { TimeOfDayLabelPipe } from './time-of-day-label.pipe';

describe('TimeOfDayLabelPipe', () => {
  let pipe: TimeOfDayLabelPipe;

  beforeEach(() => {
    pipe = new TimeOfDayLabelPipe();
  });

  it('should return 00:00 if time is null', () => {
    expect(pipe.transform(null)).toEqual('00:00');
  });
});
