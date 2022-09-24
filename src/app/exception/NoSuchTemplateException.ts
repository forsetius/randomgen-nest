export class NoSuchTemplateException extends Error {
  public constructor(variant: string) {
    super();

    this.message = `No such template version: "${variant}"`;
  }
}
