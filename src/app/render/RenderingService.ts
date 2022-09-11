import { Inject, StreamableFile } from '@nestjs/common';
import { CsvRenderer } from './CsvRenderer';
import { RendererInterface } from './RendererInterface';
import { RendererType } from './RendererType';
import { XslxRenderer } from './XslxRenderer';

export class RenderingService<T> {
  private renderers: Record<RendererType, RendererInterface<T>>;

  public constructor(
    @Inject() csv: CsvRenderer<T>,
    @Inject() xlsx: XslxRenderer<T>,
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
