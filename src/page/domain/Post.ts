import { DateTime } from 'luxon';
import { PostDef } from '../types/PostDef';
import { AppLanguageEnum } from '../types/AppLanguageEnum';
import { Content } from './Content';
import { PostData } from '../types/PostData';

export class Post extends Content {
  public static markdownFields: (keyof PostDef)[] = ['lead', 'content'];

  public readonly tags: string[];
  public readonly createdAt: DateTime;

  // public static create(
  //   slug: string,
  //   public readonly lang: AppLanguageEnum,
  //   def: PostDef,
  // ): Post {

  // }

  public constructor(
    slug: string,
    public readonly lang: AppLanguageEnum,
    def: PostDef,
  ) {
    super(slug, def);

    this.tags = def.tags;
    this.createdAt = DateTime.fromFormat(slug.slice(0, 19), 'yyyy-MM-dd_HH-mm-ss');
  }

  get date(): string {
    return this.createdAt.toLocaleString(DateTime.DATE_FULL, { locale: this.lang });
  }

  get time(): string {
    return this.createdAt.toLocaleString(DateTime.TIME_SIMPLE, { locale: this.lang });
  }

  public render(): PostData {
    return {
      slug: this.slug,
      lang: this.lang,
      title: this.title,
      headerImage: this.headerImage,
      thumbnailImage: this.thumbnailImage,
      lead: this.lead,
      content: this.content,
      blocks: this.blocks,
      date: this.date,
      time: this.time,
    };
  }
}
