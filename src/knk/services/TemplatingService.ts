import fs from 'fs';
import { sync as glob } from 'glob';
import path from 'path';
import { KnkSourceModel } from '../models/KnkSourceModel';
import { KnkTemplateModel } from '../models/KnkTemplateModel';
import { GamePrefix } from '../models/types';
import { NoSuchTemplateException } from '../../app/exception/NoSuchTemplateException';
import { DefaultedCollection } from '../../app/utils/DefaultedCollection';
import { RollableCollection } from '../../app/utils/RollableCollection';

export class TemplatingService {
  public static readonly FALLBACK_LANG = 'en';

  // eslint-disable-next-line max-len
  private templates: Map<GamePrefix, Game>
  Map<VersionName, DefaultedCollection<KnkTemplateModel>>> = new Map();

  public constructor() {
    const sourceFiles = glob(`${__dirname}/templates/**/*.json`);

    sourceFiles.forEach((sourceFile) => {
      const dirs = path.dirname(sourceFile).split(path.sep);
      const [gamePrefix, versionName] = dirs.slice(dirs.length - 2);
      const lang = path.basename(sourceFile, '.json');
      const templateDto = JSON.parse(
        fs.readFileSync(sourceFile, 'utf-8'),
      ) as KnkSourceModel;

      if (!this.templates.has(gamePrefix)) {
        this.templates.set(gamePrefix, new Map());
      }
      const game = this.templates.get(gamePrefix)!;

      if (!game.has(versionName)) {
        game.set(
          versionName,
          new DefaultedCollection<KnkTemplateModel>(TemplatingService.FALLBACK_LANG),
        );
      }
      const version = game.get(versionName)!;

      version.set(lang, this.unserialize(templateDto));
    });
  }

  protected unserialize(templateDto: KnkSourceModel): KnkTemplateModel {
    return {
      factions: new RollableCollection(templateDto.factions),
      events: new RollableCollection(templateDto.events),
      externalRelations: new RollableCollection(templateDto.externalRelations),
      internalRelations: new RollableCollection(templateDto.internalRelations),
      resources: new RollableCollection(templateDto.resources),
      rumours: new RollableCollection(templateDto.rumours),
    };
  }

  public get(
    gamePrefix: string,
    variant: string,
    lang?: string,
  ) {
    const templateName = `${gamePrefix}-${variant}`;

    if (!this.templates.has(templateName)) {
      throw new NoSuchTemplateException(templateName);
    }

    return this.templates.get(templateName)!.get(lang);
  }
}
