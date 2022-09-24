export class CountingMap<T extends string | number> {
  private store: Map<T, number> = new Map();

  public put(index: T): void {
    if (!this.store.has(index)) {
      this.store.set(index, 0);
    }

    const currentCount = this.store.get(index)!;
    this.store.set(index, currentCount + 1);
  }

  public getCount(key: T): number {
    return this.store.get(key) ?? 0;
  }

  public getTotal(): number {
    return Array.from(this.store.values())
      .reduce((previous, current) => previous + current, 0);
  }
}
