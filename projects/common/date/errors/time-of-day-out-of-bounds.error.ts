export class TimeOfDayOutOfBounds extends Error {
  constructor(timeString: string) {
    super();
    this.message = `${timeString} is not a valid string to build a TimeOfDay object. Minutes or hours are out of bounds`;
  }
}
