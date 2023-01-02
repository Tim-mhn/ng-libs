import { AlertColor } from '../models/color';
import { AlertIconPipe } from './icon.pipe';

describe('AlertIconPipe', () => {
  it('create an instance', () => {
    const pipe = new AlertIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the right icons when color is a AlertColor', () => {
    const pipe = new AlertIconPipe();
    const color: AlertColor = 'primary';

    const iconSrc = pipe.transform(color);

    expect(iconSrc).toContain('information-circle-solid-blue-500');
  });

  it('should return a svg icon ', () => {
    const pipe = new AlertIconPipe();
    const color: AlertColor = 'destructive';

    const iconSrc = pipe.transform(color);

    expect(iconSrc).toContain('.svg');
  });

  describe('Invalid colors should return the primary icon source', () => {
    it('should return the primary icon when input is null ', () => {
      const pipe = new AlertIconPipe();
      const primary: AlertColor = 'primary';
      const primaryIconSrc = <string>pipe.transform(primary);

      const nullColor = <AlertColor>null;
      const iconSrc = pipe.transform(nullColor);

      expect(iconSrc).toEqual(primaryIconSrc);
    });

    it('should return the primary icon when input is "" ', () => {
      const pipe = new AlertIconPipe();
      const primary: AlertColor = 'primary';
      const primaryIconSrc = <string>pipe.transform(primary);

      const emptyString = <AlertColor>'';
      const iconSrc = pipe.transform(emptyString);

      expect(iconSrc).toEqual(primaryIconSrc);
    });

    it('should return the primary icon when input is not a AlertColor ', () => {
      const pipe = new AlertIconPipe();
      const primary: AlertColor = 'primary';
      const primaryIconSrc = <string>pipe.transform(primary);

      const notAAlertColor = <AlertColor>'notAAlertColor';
      const iconSrc = pipe.transform(notAAlertColor);

      expect(iconSrc).toEqual(primaryIconSrc);
    });
  });
});
