import { BlockStyle } from './BlockStyle';
import { BlockType } from './BlockType';

export interface NoteBlockDef {
  type: BlockType.NOTE;
  style: BlockStyle;
  title: string;
  image?: string;
  content: string;
}

export interface PageBlockDef {
  type: BlockType.PAGE;
  slug: string;
}

export interface PostBlockDef {
  type: BlockType.POST;
  slug: string;
}

export interface PageSetBlockDef {
  type: BlockType.PAGE_SET;
  title: string;
  items: string[];
}

export interface PostListBlockDef {
  type: BlockType.POST_LIST;
  title: string;
  itemCount: number;
  tag?: string;
  link?: string;
}

export interface PostSetBlockDef {
  type: BlockType.POST_SET;
  title: string;
  items:  string[];
}

export type BlockDef = NoteBlockDef
  | PageBlockDef
  | PageSetBlockDef
  | PostBlockDef
  | PostListBlockDef
  | PostSetBlockDef;
