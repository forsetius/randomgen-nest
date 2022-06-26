import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BaseGeneratorService } from '../../app/types/BaseGeneratorService';
import { CountingMap } from '../../app/utils/CountingMap';
import { shuffledIter } from '../../app/utils/random';
import { RollableCollection } from '../../app/utils/RollableCollection';
import { Faction } from '../domain/Faction';
import { ValueValidationException } from '../exceptions/ValueValidationException';
import { knkConfig } from '../KnkConfig';
import { KnkRequestParamsModel } from '../models/KnkRequestParamsModel';
import { KnkSourceModel } from '../models/KnkSourceModel';
import { KnkTemplateModel, TemplateName } from '../models/types';

@Injectable()
export class GeneratorService extends BaseGeneratorService<KnkRequestParamsModel, KnkSourceModel> {
  private templates: Map<TemplateName, KnkTemplateModel> = new Map();

  constructor(
    @Inject(knkConfig.KEY)
    private config: ConfigType<typeof knkConfig>,
  ) {
    super();

    Object.entries(this.getSourceDataDir('knk'))
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

  private validateParams(params: KnkRequestParamsModel): void {
    if (!this.templates.has(params.templateName)) {
      throw new ValueValidationException(`No such template: "${params.templateName}"`);
    }

    if (!this.config.lang.supported.includes(params.lang)) {
      throw new ValueValidationException(`Language "${params.lang}" is unsupported`);
    }

    const maxFactions = this.config.numberOfFactions.max;
    if (params.numberOfFactions < 2 && params.numberOfFactions > maxFactions) {
      throw new ValueValidationException(`Number of factions should be between 2 and ${maxFactions}`);
    }
  }

  public generate(params: KnkRequestParamsModel): string {
    this.validateParams(params); // FIXME validate by annotations
    const { templateName, lang, numberOfFactions } = params;

    const template = this.templates.get(templateName)!;

    const factionCounts = new CountingMap<string>();
    const factionDict: Map<FactionName, Faction> = new Map(
      new Array<Faction>(numberOfFactions)
        .map(() => {
          const factionType = template.factions.getRandom();
          factionCounts.put(factionType);

          const faction = new Faction(
            factionCounts.getCount(factionType),
            factionType,
            template.resources.getRandom(),
            template.internalRelations.getRandom(),
          );

          return [faction.getLabel(), faction];
        }),
    );

    factionDict.forEach((thisFaction, thisLabel) => {
      const otherFactions = [...factionDict.values()]
        .filter((otherFaction) => thisLabel !== otherFaction.getLabel());

      otherFactions.filter((otherFaction) => !otherFaction.externalRelations.has(thisLabel))
        .forEach((otherFaction) => {
          const relation = template.externalRelations.getRandom();
          thisFaction.externalRelations.set(otherFaction.getLabel(), relation);
          otherFaction.externalRelations.set(thisLabel, relation);
        });

      thisFaction.rumour = this.generateEvent(
        template.rumours.getRandom(),
        [thisFaction.getLabel(), ...otherFactions.map((otherFaction) => otherFaction.getLabel())],
      );
    });

    const event = this.generateEvent(
      template.events.getRandom(),
      [...factionDict.keys()],
    );

    return this.render(lang, [...factionDict.values()], event);
  }

  private generateEvent(
    template: string,
    factions: FactionName[],
  ) {
    const tokens = template.match(/%\d+/g) ?? [];
    const tokenNames = Array.from(new Set(tokens));
    if (tokenNames.length === 0) {
      return template;
    }

    let event = template.replaceAll(tokenNames.shift()!, factions.shift()!);
    const factionGenerator = shuffledIter(factions);

    tokenNames.forEach((tokenName) => {
      event = event.replaceAll(tokenName, factionGenerator.next().value ?? '');
    });

    return event;
  }

  private render(
    lang: string,
    factions: Faction[],
    event: string,
  ): string {
    return `${factions.length}-${event}`;
  }
}

type FactionName = string;
