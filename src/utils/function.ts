//function textSlicer

/**
 * Trims a string to a specified maximum number of characters and appends "..." if it exceeds that limit.
 *
 * @param {string} text - The text to be trimmed.
 * @param {number} [maxNumber=50] - The maximum number of characters to keep (default is 50).
 * @returns {string} The trimmed text with "..." if it was too long, otherwise the original text.
 */
export function textSlicer(text: string, maxNumber: number = 50): string {
  if (text.length >= maxNumber) {
    return `${text.slice(0, maxNumber)}...`;
  }
  return text;
}

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
