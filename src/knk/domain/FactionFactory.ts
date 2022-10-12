import { shuffle } from '../../app/utils/random';
import { RollableCollection } from '../../app/utils/RollableCollection';
import { RoundRobinCollection } from '../../app/utils/RoundRobinCollection';
import type { KnkSourceModel, KnkTemplateModel } from '../models';
import { Faction } from './Faction';

export class FactionFactory {
  private template: KnkTemplateModel;

  public constructor(
    dict: KnkSourceModel,
  ) {
    this.template = {
      factions: new RollableCollection(dict.factions),
      events: new RollableCollection(dict.events),
      externalRelations: new RollableCollection(dict.externalRelations),
      internalRelations: new RollableCollection(dict.internalRelations),
      resources: new RollableCollection(dict.resources),
      rumours: new RollableCollection(dict.rumours),
    };
  }

  public rollFactions(
    numberOfFactions: number,
  ): Faction[] {
    const factions = new Array(numberOfFactions)
      .fill(undefined)
      .map(() => this.template.factions.getRandom())
      .sort();

    let nth = 1;

    return factions.map((factionType, i, arr) => {
      nth = factionType === arr[i - 1] ? nth + 1 : 1;

      return new Faction(
        nth,
        factionType,
        this.template.resources.getRandom(),
        this.template.internalRelations.getRandom(),
      );
    });
  }

  public rollExternalRelations(
    factions: Faction[],
    index: number,
  ): void {
    const thisFaction = factions[index];
    if (typeof thisFaction === 'undefined') {
      throw new RangeError('Invalid faction index');
    }

    const thisLabel = thisFaction.getLabel();

    factions
      .filter((faction) => !(
        faction.getLabel() === thisLabel || faction.externalRelations.has(thisLabel)
      ))
      .forEach((otherFaction) => {
        const relation = this.template.externalRelations.getRandom();
        thisFaction.externalRelations.set(otherFaction.getLabel(), relation);
        otherFaction.externalRelations.set(thisLabel, relation);
      });
  }

  public rollRumour(
    factions: Faction[],
    index: number,
  ): string {
    if (typeof factions[index] === 'undefined') {
      throw new RangeError('Invalid faction index');
    }

    let rumour = this.template.rumours.getRandom();
    rumour = rumour.replaceAll('%0%', factions[index]!.getLabel());
    const others = factions.filter((_, i) => i !== index);

    return this.substituteTokens(rumour, others);
  }

  public rollEvent(
    factions: Faction[],
  ): string {
    const event = this.template.events.getRandom();

    return this.substituteTokens(event, factions);
  }

  private substituteTokens(
    template: string,
    factions: Faction[],
  ): string {
    const tokens = template.match(/%\d+%/g) ?? [];
    const uniqueTokens = Array.from(new Set(tokens));
    if (uniqueTokens.length === 0) {
      return template;
    }

    const othersCollection = new RoundRobinCollection(shuffle(factions));
    let result = template;
    uniqueTokens.forEach((tokenName) => {
      const replacement = othersCollection.get().getLabel();
      result = result.replaceAll(tokenName, replacement);
    });

    return result;
  }
}
