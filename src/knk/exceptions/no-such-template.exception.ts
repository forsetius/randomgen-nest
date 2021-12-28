export class NoSuchTemplateException extends Error {
  public constructor(templateLabel: string) {
    super(`No such template: "${templateLabel}"`);
  }
}
