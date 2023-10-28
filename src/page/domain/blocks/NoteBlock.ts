import { NoteBlockDef } from '../../types/BlockDef';
import { Block } from './Block';

export class NoteBlock extends Block {
  public readonly image: string | undefined;
  public readonly content: string;

  public constructor(def: NoteBlockDef) {
    super(def);

    this.image = def.image;
    this.content = def.content;
  }
}
