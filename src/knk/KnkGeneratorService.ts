import { Injectable } from '@nestjs/common';
import { CountingMap } from '../app/utils/CountingMap';
import { getSourceDataDir } from '../app/utils/getData';
import { shuffle } from '../app/utils/random';
import { RollableCollection } from '../app/utils/RollableCollection';
import { RoundRobinCollection } from '../app/utils/RoundRobinCollection';
import { Faction } from './domain/Faction';
import { ValueValidationException } from './exceptions/ValueValidationException';
import { KnkResponseModel } from './models/KnkResponseModel';
import { KnkSourceModel } from './models/KnkSourceModel';
import { KnkTemplateModel } from './models/KnkTemplateModel';
import { TemplateName } from './models/types';

@Injectable()
export class KnkGeneratorService {
  private templates: Map<TemplateName, KnkTemplateModel> = new Map();

  constructor() {
    Object.entries(getSourceDataDir<KnkSourceModel>('knk'))
      .forEach(([name, dict]) => {
        this.templates.set(
          name,
          {
            factions: new RollableCollection(dict.factions),
            events: new RollableCollection(dict.events),
            externalRelations: new RollableCollection(dict.externalRelations),
            internalRelations: new RollableCollection(dict.internalRelations),
            resources: new RollableCollection(dict.resources),
            rumours: new RollableCollection(dict.rumours),
          },
        );
      });
  }

  public generate(
    templateName: string,
    numberOfFactions: number,
  ): KnkResponseModel[] {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new ValueValidationException(`No such template: "${templateName}"`);
    }

    const factions: Faction[] = this.rollFactions(template, numberOfFactions);
    factions.forEach((thisFaction) => {
      this.rollExternalRelations(template, thisFaction, factions);

      thisFaction.rumour = this.rollEvent(
        template.rumours.getRandom(),
        thisFaction.getLabel(),
        factions
          .filter((faction) => faction.getLabel() !== thisFaction.getLabel())
          .map((faction) => faction.getLabel()),
      );
    });

    return Array.from(factions.values()).map((faction) => faction.serialize());
  }

  private rollFactions(
    template: KnkTemplateModel,
    numberOfFactions: number,
  ): Faction[] {
    const factionCounts = new CountingMap<string>();

    return new Array<Faction>(numberOfFactions)
      .map(() => {
        const factionType = template.factions.getRandom();
        factionCounts.put(factionType);

        return new Faction(
          factionCounts.getCount(factionType),
          factionType,
          template.resources.getRandom(),
          template.internalRelations.getRandom(),
        );
      });
  }

  private rollExternalRelations(
    template: KnkTemplateModel,
    thisFaction: Faction,
    factions: Faction[],
  ): void {
    const thisLabel = thisFaction.getLabel();

    factions
      .filter((faction) => !(
        faction.getLabel() === thisLabel || faction.externalRelations.has(thisLabel)
      ))
      .forEach((otherFaction) => {
        const relation = template.externalRelations.getRandom();
        thisFaction.externalRelations.set(otherFaction.getLabel(), relation);
        otherFaction.externalRelations.set(thisLabel, relation);
      });
  }

  private rollEvent(
    eventTemplate: string,
    thisFactionLabel: string,
    otherFactionLabels: string[],
  ): string {
    let event = eventTemplate;
    event.replaceAll('%0%', thisFactionLabel);

    const tokens = eventTemplate.match(/%\d+%/g) ?? [];
    const tokenNames = Array.from(new Set(tokens));
    if (tokenNames.length === 0) {
      return eventTemplate;
    }

    const others = new RoundRobinCollection(shuffle(otherFactionLabels));

    tokenNames.forEach((tokenName) => {
      event = event.replaceAll(tokenName, others.get());
    });

    return event;
  }
}
