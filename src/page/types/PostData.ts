import { BlockPlacement } from './BlockPlacement';
import { Block } from './Block';

export interface PostData {
  slug: string;
  lang: string;
  title: string;
  headerImage: string;
  thumbnailImage: string;
  lead: string | undefined;
  content: string;
  blocks: Record<BlockPlacement, Block[]>;
  date: string;
  time: string;
}
