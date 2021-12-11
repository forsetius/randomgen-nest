export class RollableCollection<T> {
  public constructor(
    private readonly store: T[],
  ) {
  }

  public get(): T {
    const position = Math.floor(Math.random() * this.store.length);

    return this.store[position];
  }
}
