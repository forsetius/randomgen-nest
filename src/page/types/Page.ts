import { Block } from './Block';
import { BlockPlacement } from './BlockPlacement';
import { AppLanguageEnum } from './AppLanguageEnum';

export interface Page {
  slug: string;
  lang: AppLanguageEnum,
  title: string;
  subtitle?: string;
  headerImage: string;
  lead?: string;
  content: string;
  blocks: Record<BlockPlacement, Block[]> | undefined;
}
