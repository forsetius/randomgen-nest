import { ColumnFooterFunction } from './ColumnFooterFunction';
import { ColumnFormat } from './ColumnFormat';

export class Column {
  public readonly label: string | null;
  public readonly format: ColumnFormat;
  public readonly footerFn: ColumnFooterFunction | null;

  public constructor(
    options: {
      footerFn?: keyof typeof ColumnFooterFunction,
      format?: keyof typeof ColumnFormat,
      label?: string,
    } = {},
  ) {
    this.format = ColumnFormat[options.format ?? 'STRING'];
    this.footerFn = options.footerFn ? ColumnFooterFunction[options.footerFn] : null;
    this.label = options.label ?? null;
  }
}
