export function roll(n: number): number {
  return Math.floor(Math.random() * n) + 1;
}

export function flipCoin(): boolean {
  return Math.random() > 0.5;
}
