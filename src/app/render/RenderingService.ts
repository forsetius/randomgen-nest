import { Injectable, StreamableFile } from '@nestjs/common';
import { CsvRenderer } from './CsvRenderer';
import type { RendererInterface } from './RendererInterface';
import type { RendererType } from './RendererType';
import { XlsxRenderer } from './XlsxRenderer';

@Injectable()
export class RenderingService<T> {
  private renderers: Record<RendererType, RendererInterface<T>>;

  public constructor(
    csv: CsvRenderer<T>,
    xlsx: XlsxRenderer<T>,
  ) {
    this.renderers = { csv, xlsx };
  }

  public render(
    type: RendererType,
    data: T,
  ): StreamableFile {
    return this.renderers[type].render(data);
  }
}
