import { PageDef } from '../types/PageDef';
import { Defs } from '../types/Defs';
import { Content } from './Content';

export class Page extends Content {
  public readonly subtitle: string | undefined;

  public constructor(
    slug: string,
    def: PageDef,
  ) {
    super(slug, def);

    this.subtitle = def.subtitle;
  }

  public renderAsides(defLib: Defs) {
    super.renderBlocks('pages', defLib);
  }
}
