export function convert24HFormatHourTo12HFormatHour(hour: number) {
  return [0, 12].includes(hour) ? 12 : hour % 12;
}

export function convert12HFormatHourTo24HFormatHour(
  hour: number,
  isAM: boolean
) {
  if (hour === 12) {
    return isAM ? 0 : 12;
  }

  return isAM ? hour : hour + 12;
}
