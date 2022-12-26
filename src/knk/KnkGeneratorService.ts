import { Injectable } from '@nestjs/common';
import { Column } from '../app/render/tabular/Column';
import type { TabularDataModel } from '../app/render/tabular/TabularDataModel';
import { getSourceDataDir } from '../app/utils/getData';
import { FactionFactory } from './domain/FactionFactory';
import { ValueValidationException } from './exceptions/ValueValidationException';
import type { KnkResponseModel, KnkSourceModel, TemplateName } from './models';

@Injectable()
export class KnkGeneratorService {
  private factories: Map<TemplateName, FactionFactory> = new Map();

  constructor() {
    Object.entries(getSourceDataDir<KnkSourceModel>('knk'))
      .forEach(([name, dict]) => {
        this.factories.set(name, new FactionFactory(dict));
      });
  }

  public generate(
    templateName: string,
    numberOfFactions: number,
  ): KnkResponseModel {
    const factionFactory = this.factories.get(templateName);
    if (!factionFactory) {
      throw new ValueValidationException(`No such template: "${templateName}"`);
    }

    const factions = factionFactory.rollFactions(numberOfFactions);
    for (let i = 0; i < factions.length; i++) {
      factionFactory.rollExternalRelations(factions, i);
      factionFactory.rollRumour(factions, i);
    }

    return {
      factions: factions.map((faction) => faction.toJSON()),
      event: factionFactory.rollEvent(factions),
    };
  }

  public tabularize(
    data: KnkResponseModel,
  ): TabularDataModel {
    return [
      {
        header: 'Frakcje',
        columns: [
          new Column({ label: 'label' }),
          new Column({ label: 'resource' }),
          new Column({ label: 'rumour' }),
          new Column({ label: 'internalRelations' }),
          new Column({ label: 'externalRelations' }),
        ],
        rows: data.factions,
      },
      {
        header: 'Wydarzenia',
        columns: [
          new Column(),
        ],
        rows: [data.event],
      },
    ];
  }
}
