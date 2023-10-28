import { PostSetBlockDef } from '../../types/BlockDef';
import { Block } from './Block';
import { ContentService } from '../../ContentService';
import { Post } from '../Post';

export class PostSetBlock extends Block {
  public readonly collection: Post[];

  public constructor(def: PostSetBlockDef, contentService: ContentService) {
    super(def);

    this.collection = def.items.map((slug) => contentService.posts.get(slug)!);
  }
}
