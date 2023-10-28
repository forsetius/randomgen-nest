import { DateTime } from 'luxon';
import { PostDef } from '../types/PostDef';
import { AppLanguageEnum } from '../types/AppLanguageEnum';
import { Defs } from '../types/Defs';
import { Content } from './Content';

export class Post extends Content {
  public readonly tags: string[];
  public readonly createdAt: DateTime;

  public constructor(
    slug: string,
    public readonly lang: AppLanguageEnum,
    def: PostDef,
  ) {
    super(slug, def);

    this.tags = def.tags;
    this.createdAt = DateTime.fromFormat(slug.slice(0, 19), 'yyyy-MM-dd_HH-mm-ss');
  }

  public getDate(): string {
    return this.createdAt.toLocaleString(DateTime.DATE_FULL, { locale: this.lang });
  }

  public getTime(): string {
    return this.createdAt.toLocaleString(DateTime.TIME_SIMPLE, { locale: this.lang });
  }

  public renderAsides(defLib: Defs) {
    super.renderBlocks('pages', defLib);
  }
}
