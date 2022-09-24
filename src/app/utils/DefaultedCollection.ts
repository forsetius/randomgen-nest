import type { Name } from '../../knk/models';
import { LangVersionException } from '../exception/LangVersionException';

export class DefaultedCollection<T> {
  private store: Map<Name, T> = new Map();

  public constructor(
    private defaultElement: Name,
  ) {
  }

  public set(name: Name, element: T): void {
    this.store.set(name, element);
  }

  public get(name: Name): T {
    if (!this.store.has(this.defaultElement)) {
      throw new LangVersionException(this.defaultElement);
    }

    if (this.store.has(name)) {
      return this.store.get(name)!;
    }

    return this.store.get(this.defaultElement)!;
  }
}
