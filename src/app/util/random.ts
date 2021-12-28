export function roll(n: number): number {
  return Math.floor(Math.random() * n) + 1;
}

export function flipCoin(): boolean {
  return Math.random() > 0.5;
}

/**
 * Shuffle the elements of the array
 *
 * @param arr array to shuffle
 * @returns shuffled copy of source array
 */
export function shuffle<T>(arr: T[]): T[] {
  const arrCopy = Array.from(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const k = arrCopy[i]!;
    arrCopy[i] = arrCopy[j]!;
    arrCopy[j] = k;
  }

  return arrCopy;
}
