import { StreamableFile } from '@nestjs/common';
import { RendererInterface } from './RendererInterface';

export class XslxRenderer<T> implements RendererInterface<T> {
  public render(data: T): StreamableFile {
    return new StreamableFile(Buffer.from(data as unknown as string));
  }
}
