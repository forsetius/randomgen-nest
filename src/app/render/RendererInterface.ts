import { StreamableFile } from '@nestjs/common';

export interface RendererInterface<T> {
  render(data: T): StreamableFile;
}
