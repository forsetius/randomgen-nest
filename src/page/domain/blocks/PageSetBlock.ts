import { PageSetBlockDef } from '../../types/BlockDef';
import { Block } from './Block';
import { ContentService } from '../../ContentService';
import { Page } from '../Page';

export class PageSetBlock extends Block {
  public readonly collection: Page[];

  public constructor(def: PageSetBlockDef, contentService: ContentService) {
    super(def);

    this.collection = def.items.map((slug) => contentService.pages.get(slug)!);
  }
}
