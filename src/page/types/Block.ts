import { BlockStyle } from './BlockStyle';
import { BlockPlacement } from './BlockPlacement';

export interface Block {
  title: string;
  style: BlockStyle;
  content: string;
  image: string;
  placement: BlockPlacement;
}
