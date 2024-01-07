import { BlockStyle } from './BlockStyle';
import { Page } from '../domain/Page';
import { Post } from '../domain/Post';
import { BlockType } from './BlockType';
import { PageData } from './PageData';
import { PostData } from './PostData';

// type Block1 = UniBlock | MultiBlock;

// interface ABlock {
//   type: BlockType;
//   title: string;
// }
// interface UniBlock extends ABlock {
//   content: string;
// }

// interface MultiBlock extends ABlock {
//   items: Page[] | Post[]
// }

export type Block = NoteBlock
  | PageData & { type: BlockType.PAGE }
  | PageSetBlock
  | PostData & { type: BlockType.POST }
  | PostListBlock
  | PostSetBlock;

export interface NoteBlock {
  type: BlockType.NOTE,
  style: BlockStyle;
  title: string;
  content: string;
}

export interface PageSetBlock {
  type: BlockType.PAGE_SET,
  title: string;
  items: Page[];
}

export interface PostListBlock {
  type: BlockType.POST_LIST,
  title: string;
  items: Post[];
  tag: string | undefined;
  link: string | undefined;
}

export interface PostSetBlock {
  type: BlockType.POST_SET,
  title: string;
  items:  Post[];
}
