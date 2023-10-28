export class NoSuchTranslationException extends Error {
  public constructor(label: string) {
    super(`No such translation label: "${label}"`);
  }
}
