import { PostBlockDef } from '../../types/BlockDef';
import { Block } from './Block';
import { ContentService } from '../../ContentService';
import { Post } from '../Post';

export class PostBlock extends Block {
  public readonly item: Post;

  public constructor(def: PostBlockDef, contentService: ContentService) {
    super(def);

    this.item = contentService.posts.get(def.slug)!;
  }
}
