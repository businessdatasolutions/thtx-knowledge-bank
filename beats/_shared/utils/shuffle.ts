/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 *
 * Randomly shuffles an array in-place.
 * Creates a copy first to avoid mutating the original array.
 *
 * @param array - The array to shuffle
 * @returns A new shuffled array (original is not modified)
 *
 * @example
 * const options = [{ id: '1' }, { id: '2' }, { id: '3' }];
 * const shuffled = shuffle(options);
 * // shuffled is a new array with randomly ordered elements
 * // options remains unchanged
 */
export function shuffle<T>(array: readonly T[]): T[] {
  // Create a copy to avoid mutating the original
  const result = [...array];

  // Fisher-Yates shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default shuffle;
