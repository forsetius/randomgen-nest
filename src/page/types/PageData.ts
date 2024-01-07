import { BlockPlacement } from './BlockPlacement';
import { Block } from './Block';

export interface PageData {
  slug: string;
  subtitle: string | undefined;
  title: string;
  headerImage: string;
  thumbnailImage: string;
  lead: string | undefined;
  content: string;
  blocks: Record<BlockPlacement, Block[]>;
}
