export function roll(n: number): number {
  return Math.floor(Math.random() * n) + 1;
}

export function flipCoin(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Shuffle the elements of the array
 *
 * Does not modify the original array
 *
 * @param originalArray array to shuffle
 * @returns shuffled copy of source array
 */
export function shuffle<T>(originalArray: T[]): T[] {
  const arr = Array.from(originalArray);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }

  return arr;
}

export function pickRandomly<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error('Passed array must have at least 1 element');
  }

  return shuffle(arr)[0]!;
}

export function* shuffledIter<T>(arr: T[]): Generator<T, undefined, undefined> {
  const shuffled = shuffle(arr);
  yield* shuffled;

  return undefined;
}
