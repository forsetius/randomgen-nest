import { Column } from '../../app/render/tabular/Column';
import type { TabularDataModel } from '../../app/render/tabular/TabularDataModel';

export abstract class BaseGeneratorService {
  abstract generate(): string;

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
