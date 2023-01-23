import { Injectable, StreamableFile } from '@nestjs/common';
import type { TabularDataModel } from '../tabular/TabularDataModel';
import type { RendererInterface } from './RendererInterface';

@Injectable()
export class XlsxRenderer implements RendererInterface {
  public render(tabularisedData: TabularDataModel): StreamableFile {
    return new StreamableFile(Buffer.from(tabularisedData as unknown as string));
  }
}
