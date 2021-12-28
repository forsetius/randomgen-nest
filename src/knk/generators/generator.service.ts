import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../../app/types/base-generator.service';
import { shuffle } from '../../app/util/random';
import { RollableCollection } from '../../app/util/rollable-collection';
import { Faction } from '../domain/faction';
import { Relation } from '../domain/relation';
import { NoSuchTemplateException } from '../exceptions/no-such-template.exception';
import { KnkRequestParamsModel } from '../models/knk.request-params.model';
import { KnkSourceModel } from '../models/knk.source.model';
import { KnkTemplateModel, TemplateName } from '../models/types';

@Injectable()
export class GeneratorService extends BaseGeneratorService<KnkRequestParamsModel, KnkSourceModel> {
  private templates: Map<TemplateName, KnkTemplateModel> = new Map();

  constructor() {
    super();

    Object.entries(this.getSourceDataDir('knk'))
      .map(([name, dict]) => [
        name,
        {
          factions: new RollableCollection(dict.factions),
          events: new RollableCollection(dict.events),
          externalRelations: new RollableCollection(dict.externalRelations),
          internalRelations: new RollableCollection(dict.internalRelations),
          resources: new RollableCollection(dict.resources),
          rumours: new RollableCollection(dict.rumours),
        },
      ]);
  }

  public generate(params: KnkRequestParamsModel): string {
    if (!this.templates.has(params.templateName)) {
      throw new NoSuchTemplateException(params.templateName);
    }

    const template = this.templates.get(params.templateName)!;
    const numberOfFactions = params.n;

    const factions: Faction[] = [];
    for (let i = 0; i < numberOfFactions; i++) {
      const factionType = template.factions.get();
      const factionNumber = factions.filter((faction) => faction.type === factionType)
        .length + 1;

      factions[i] = new Faction(
        factionNumber,
        factionType,
        template.resources.get(),
        template.internalRelations.get(),
      );
    }

    const relations: Map<string, Relation> = new Map();

    factions.forEach((faction) => {
      const allFactionsExcludingCurrent = this.omitFaction(faction, factions);

      allFactionsExcludingCurrent.forEach((otherFaction) => {
        if (relations.has(`${otherFaction.getLabel()}-${faction.getLabel()}`)) {
          faction.externalRelations.push(
            relations.get(`${otherFaction.getLabel()}-${faction.getLabel()}`)!,
          );
        } else {
          const relation: Relation = {
            type: template.externalRelations.get(),
            oneSide: faction,
            otherSide: otherFaction,
          };

          relations.set(`${faction.getLabel()}-${otherFaction.getLabel()}`, relation);
          faction.externalRelations.push(relation);
        }
      });

      faction.rumour = this.generateEvent(
        template.rumours.get(),
        allFactionsExcludingCurrent,
      );
    });

    const event = this.generateEvent(
      template.events.get(),
      factions,
    );

    return this.render(factions, event);
  }

  private generateEvent(
    template: string,
    factions: Faction[],
  ) {
    const shuffledFactions = shuffle(factions);
    const getFaction = (function* () {
      yield* shuffledFactions;

      return undefined;
    }());

    return template.replaceAll(/%s/g, () => getFaction.next().value?.getLabel() ?? '');
  }

  private omitFaction(
    excluded: Faction,
    all: Faction[],
  ): Faction[] {
    return all.filter(
      (otherFaction) => excluded.getLabel() !== otherFaction.getLabel(),
    );
  }

  private render(
    factions: Faction[],
    event: string,
  ): string {
    return `${factions.length}-${event}`;
  }
}
