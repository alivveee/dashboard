export const toggleInArray = <T>(items: T[], value: T): T[] =>
  items.includes(value)
    ? items.filter((item) => item !== value)
    : [...items, value];
