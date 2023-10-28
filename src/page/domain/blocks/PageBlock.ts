import { PageBlockDef } from '../../types/BlockDef';
import { Block } from './Block';
import { ContentService } from '../../ContentService';
import { Page } from '../Page';

export class PageBlock extends Block {
  public readonly item: Page;

  public constructor(def: PageBlockDef, contentService: ContentService) {
    super(def);

    this.item = contentService.pages.get(def.slug)!;
  }
}
