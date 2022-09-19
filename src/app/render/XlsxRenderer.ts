import { Injectable, StreamableFile } from '@nestjs/common';
import { RendererInterface } from './RendererInterface';

@Injectable()
export class XlsxRenderer<T> implements RendererInterface<T> {
  public render(data: T): StreamableFile {
    return new StreamableFile(Buffer.from(data as unknown as string));
  }
}
