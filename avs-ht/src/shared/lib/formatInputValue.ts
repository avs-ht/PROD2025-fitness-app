export const formatInputValue = (newValue: string) => {
  const value = newValue
    .trim()
    .replace(/[^0-9.-]/g, '')
    .replace(/^0+/, '');
  if (value === '') {
    return 0;
  }
  return Number(value);
};
