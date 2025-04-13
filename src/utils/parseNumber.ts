export function parseNumber(input: string | number): number {
  if (typeof input === 'number') return input;
  const standardized = input.replace(',', '.');
  // .replace(/[^\d.-]/g, '');

  const parsed = parseFloat(standardized);

  if (isNaN(parsed)) {
    throw new Error(`Couldn't parse a number from: ${input}`);
  }

  return parsed;
}
