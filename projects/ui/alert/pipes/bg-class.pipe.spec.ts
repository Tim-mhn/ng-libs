import { AlertColor } from '../models/color';
import { AlertBgClassPipe } from './bg-class.pipe';

describe('AlertBgClassPipe', () => {
  let pipe: AlertBgClassPipe;

  beforeEach(() => {
    pipe = new AlertBgClassPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return bg-blue-50 if input is "primary"', () => {
    const color: AlertColor = 'primary';
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-blue-50');
  });

  it('should return bg-red-50 if input is "destructive"', () => {
    const color: AlertColor = 'destructive';
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-red-50');
  });

  it('should return bg-yellow-50 if input is "warn"', () => {
    const color: AlertColor = 'warn';
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-yellow-50');
  });

  it('should return bg-green-50 if input is "success"', () => {
    const color: AlertColor = 'success';
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-green-50');
  });

  it('should return bg-blue-50 if input is not a AlertColor', () => {
    const color = <AlertColor>'not-a-theme-color';
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-blue-50');
  });

  it('should return "bg-blue-50" if input is null', () => {
    const color = <AlertColor>null;
    const bgClass = pipe.transform(color);

    expect(bgClass).toEqual('bg-blue-50');
  });
});
