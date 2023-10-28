import { BlockPlacement } from './BlockPlacement';
import { BlockDef } from './BlockDef';

export interface ContentDef {
  title: string;
  headerImage: string;
  thumbnailImage: string;
  lead?: string;
  content: string;
  blocks: Partial<Record<BlockPlacement, BlockDef[]>> | undefined;
}
