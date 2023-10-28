import { BlockType } from '../../types/BlockType';
import { BlockDef } from '../../types/BlockDef';
import {
  NoteBlock,
  PageBlock,
  PageSetBlock,
  PostBlock,
  PostListBlock,
  PostSetBlock,
} from './index';
import { ContentService } from '../../ContentService';

export abstract class Block {
  public readonly type: BlockType;

  public static create(blockDef: BlockDef, contentService: ContentService): Block {
    switch (blockDef.type) {
    case BlockType.NOTE:
      return new NoteBlock(blockDef);
    case BlockType.PAGE:
      return new PageBlock(blockDef, contentService);
    case BlockType.PAGE_SET:
      return new PageSetBlock(blockDef, contentService);
    case BlockType.POST:
      return new PostBlock(blockDef, contentService);
    case BlockType.POST_LIST:
      return new PostListBlock(blockDef, contentService);
    case BlockType.POST_SET:
      return new PostSetBlock(blockDef, contentService);
    }
  }

  public constructor(def: BlockDef) {
    this.type = def.type;
  }
}
