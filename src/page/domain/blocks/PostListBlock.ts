import { PostListBlockDef } from '../../types/BlockDef';
import { Block } from './Block';
import { ContentService } from '../../ContentService';
import { Post } from '../Post';

export class PostListBlock extends Block {
  public readonly collection: Post[];
  public readonly tag: string|undefined;
  public readonly link: string|undefined;

  public constructor(def: PostListBlockDef, contentService: ContentService) {
    super(def);

    this.tag = def.tag;
    this.link = def.link;

    if (def.tag && typeof contentService.tags.get(def.tag) === 'undefined') {
      throw new Error();
    }

    const source: Post[] = def.tag ? contentService.tags.get(def.tag)! : contentService.postsByDate;
    this.collection = source.slice(0, def.itemCount);
  }
}
