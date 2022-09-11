import { Lang } from '../../knk/models/types';

export class LangVersionException extends Error {
  public constructor(lang: Lang) {
    super();

    this.message = `No such language version: "${lang}"`;
  }
}
