import type { StreamableFile } from '@nestjs/common';
import type { TabularDataModel } from '../tabular/TabularDataModel';

export interface RendererInterface {
  render(tabularisedData: TabularDataModel): StreamableFile;
}
