import type { ViewData } from 'src/app/render/ViewData';
import { Column } from '../../app/render/tabular/Column';
import type { TabularDataModel } from '../../app/render/tabular/TabularDataModel';

export abstract class BaseGeneratorService {
  abstract generate(): string;
  abstract getMeta(): ViewData['meta'];

  public tabularize(
    data: string[],
  ): TabularDataModel {
    return [
      {
        header: '',
        columns: [new Column()],
        rows: data,
      },
    ];
  }
}
