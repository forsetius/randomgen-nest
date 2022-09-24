export class RoundRobinCollection<T> {
  private position = 0;

  public constructor(
    private store: T[] = [],
  ) {
    if (store.length < 1) {
      throw new Error('Array should have at least 1 element');
    }
  }

  public get(): T {
    const originalPosition = this.position;
    this.position = this.position === this.store.length - 1 ? 0 : this.position + 1;

    return this.store[originalPosition]!;
  }
}
