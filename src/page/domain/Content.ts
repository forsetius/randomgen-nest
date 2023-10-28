import { BlockPlacement } from '../types/BlockPlacement';
import { Block } from './blocks/Block';
import { PageDef } from '../types/PageDef';
import { marked } from 'marked';
import { Defs } from '../types/Defs';
import { PostDef } from '../types/PostDef';

export class Content {
  public readonly title: string;
  public readonly headerImage: string;
  public readonly thumbnailImage: string;
  public readonly lead: string | undefined;
  public readonly content: string;
  public readonly blocks: Record<BlockPlacement, Block[]> = {
    [BlockPlacement.RIGHT]: [],
    [BlockPlacement.TOP_RIGHT]: [],
    [BlockPlacement.UNDER_TITLE]: [],
    [BlockPlacement.UNDER_LEAD]: [],
    [BlockPlacement.BELOW]: [],
  };

  public constructor(
    public readonly slug: string,
    def: PageDef|PostDef,
  ) {
    this.title = def.title;
    this.headerImage = def.headerImage;
    this.thumbnailImage = def.thumbnailImage;
    this.lead = def.lead ? marked.parse(def.lead) : undefined;
    this.content = marked.parse(def.content);
  }

  protected renderBlocks(type: 'pages'|'posts', defLib: Defs): void {
    const blocks = defLib[type][this.slug]!.blocks ?? {};
    Object.entries(blocks)
      .forEach(([place, defs]) => {
        defs.forEach((def) => {
          this.blocks[place as BlockPlacement].push( Block.create(def, defLib));
        });
      });
  }
}
