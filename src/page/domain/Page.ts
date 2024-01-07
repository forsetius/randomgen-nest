import { PageDef } from '../types/PageDef';
import { Content } from './Content';
import { PageData } from '../types/PageData';

export class Page extends Content {
  public static markdownFields: (keyof PageDef)[] = ['lead', 'content'];

  public readonly subtitle: string | undefined;

  public constructor(
    slug: string,
    def: PageDef,
  ) {
    super(slug, def);

    this.subtitle = def.subtitle;
  }

  public render(): PageData {
    return {
      slug: this.slug,
      subtitle: this.subtitle,
      title: this.title,
      headerImage: this.headerImage,
      thumbnailImage: this.thumbnailImage,
      lead: this.lead,
      content: this.content,
      blocks: this.blocks,
    };
  }
}
