import type { Lang } from '../../knk/models';

export class LangVersionException extends Error {
  public constructor(lang: Lang) {
    super();

    this.message = `No such language version: "${lang}"`;
  }
}
