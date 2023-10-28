import { PageDef } from './PageDef';
import { PostDef } from './PostDef';
import { BlockDef } from './BlockDef';

export interface Defs {
  pages: Record<string, PageDef>,
  posts: Record<string, PostDef>,
  blocks: Record<string, BlockDef>,
}
