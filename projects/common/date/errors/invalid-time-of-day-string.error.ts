export class InvalidTimeOfDayString extends Error {
  constructor(timeString: string) {
    super();
    this.message = `${timeString} is not a valid string to build a TimeOfDay object. Please respect h:m, h:mm, hh:m or hh:mm format`;
  }
}
