import { Injectable, StreamableFile } from '@nestjs/common';
import type { RendererInterface } from './RendererInterface';

@Injectable()
export class CsvRenderer<T> implements RendererInterface<T> {
  public render(data: T): StreamableFile {
    return new StreamableFile(Buffer.from(data as unknown as string));
  }
}
