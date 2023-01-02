export const capitalize = (str: string) =>
  str.replace(/^\w/, (c) => c.toUpperCase());

export const capitalizeFirstLetter = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const capitalizeFirstLetterOfEachWord = (str: string) =>
  str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
