import { Injectable, NotFoundException } from '@nestjs/common';
import { Page } from './domain/Page';
import path from 'path';
import { AppLanguageEnum } from './types/AppLanguageEnum';
import fsSync from 'fs';
import YAML from 'yaml';
import { PageDef } from './types/PageDef';
import { PostDef } from './types/PostDef';
import { Post } from './domain/Post';
import { BlockDef } from './types/BlockDef';
import { Defs } from './types/Defs';
import { Pager } from './domain/Pager';
import { BlockPlacement } from './types/BlockPlacement';
import { BlockType } from './types/BlockType';
import { Block } from './types/Block';
import { MarkdownService } from './MarkdownService';
import { ContentDef } from './types/ContentDef';
import { Content } from './domain/Content';
import { NoteBlock } from './domain/NoteBlock';

@Injectable()
export class ContentService {
  private BASE_SOURCE_PATH = path.join(__dirname, '..', '..', 'templates', 'content');

  public readonly lib = {
    pages: new Map<Slug, Page>,
    posts: new Map<Slug, Post>,
    tags: new Map<Tag, Post[]>,
    postsByDate: [] as Post[],
  };

  public constructor(
    private readonly markdownService: MarkdownService,
    public readonly lang: AppLanguageEnum,
  ) {
    this.load();
  }

  public getPage(slug: string): Page {
    if (!this.lib.pages.has(slug)) {
      throw new NotFoundException(`No page with slug: "${slug}"`);
    }

    return this.lib.pages.get(slug)!;
  }

  public getPost(slug: string): Post {
    if (!this.lib.posts.has(slug)) {
      throw new NotFoundException(`No post with slug: "${slug}"`);
    }

    return this.lib.posts.get(slug)!;
  }

  public getPosts(itemsPerPage: number, pageNo: number): Pager<Post> {
    return new Pager(this.lib.postsByDate, itemsPerPage, pageNo);
  }

  public getPostsByTag(tag: string, itemsPerPage: number, pageNo: number): Pager<Post> {
    if (!this.lib.tags.has(tag)) {
      throw new NotFoundException(`Tag "${tag}" not found`);
    }

    return new Pager(this.lib.tags.get(tag)!, itemsPerPage, pageNo);
  }

  public reload(): void {
    this.lib.pages.clear();
    this.lib.posts.clear();
    this.lib.tags.clear();
    this.lib.postsByDate = [];

    this.load();
  }

  private load(): void {
    const defs: Defs = {
      pages: this.readSourceFiles<PageDef>(SourceDirEnum.PAGE, this.lang),
      posts: this.readSourceFiles<PostDef>(SourceDirEnum.POST, this.lang),
      blocks: this.readSourceFiles<BlockDef>(SourceDirEnum.BLOCK, this.lang),
    };

    this.createPages(this.lib.pages, defs.pages);
    this.createPages(this.lib.posts, defs.posts);
    this.lib.postsByDate = Array.from(this.lib.posts.values())
      .sort((a, b) => +b.createdAt - +a.createdAt);
    this.populateTags();

    Object.entries(defs.pages).forEach(([slug, def]) => {
      this.expandBlocks(this.lib.pages.get(slug)!, def);
    });
    Object.entries(defs.posts).forEach(([slug, def]) => {
      this.expandBlocks(this.lib.posts.get(slug)!, def);
    });
  }

  private populateTags(): void {
    for (const post of this.lib.postsByDate) {
      post.tags.forEach((tag) => {
        if (!this.lib.tags.has(tag)) {
          this.lib.tags.set(tag, []);
        }

        this.lib.tags.get(tag)!.push(post);
      });
    }
  }

  private readSourceFiles<T>(
    dirName: SourceDirEnum,
    lang: AppLanguageEnum,
  ): Record<Slug, T> {
    const sourcePath = path.join(this.BASE_SOURCE_PATH, dirName, lang);
    const dir = fsSync.readdirSync(sourcePath);

    const defs: Record<Slug, T> = {};
    dir.filter((filename: string) => filename.endsWith('.yaml'))
      .forEach((filename: string) => {
        const name = path.basename(filename, '.yaml');
        const filePath = path.join(sourcePath, filename);

        defs[name] = YAML.parse(fsSync.readFileSync(filePath, { encoding: 'utf8' })) as T;
      });

    return defs;
  }

  private createPages(defs: Defs['pages']): void {
    Object.entries(defs).forEach(([name, def]: [string, PageDef]) => {
      const definition: PageDef = {
        ...def,
        content: this.markdownService.parse(def.content),
      };

      if (def.lead) {
        definition.lead = this.markdownService.parse(def.lead);
      }

      this.lib.pages.set(name, new Page(name, definition));
    });
  }

  private createPost(defs: Defs['posts']): void {
    Object.entries(defs).forEach(([name, def]: [string, PostDef]) => {
      Post.markdownFields.forEach((fieldName) => {
        if (typeof def[fieldName] === 'string') {
          def[fieldName] = this.markdownService.parse(def[fieldName] as string);
        }
      });

      this.lib.posts.set(name, new Post(name, this.lang, def));
    });
  }

  private expandBlocks(targetItem: Content, def: ContentDef): void {
    Object.entries(def.blocks ?? {})
      .forEach(([place, blockDefs]) => {
        blockDefs.forEach((blockDef) => {
          targetItem.blocks[place as BlockPlacement].push( this.createBlock(blockDef));
        });
      });
  }

  private createBlock(blockDef: BlockDef): Block {
    switch (blockDef.type) {
    case BlockType.NOTE:
      return new NoteBlock({ ...blockDef, content: this.markdownService.parse(blockDef.content) });

    case BlockType.PAGE:
      return {
        type: BlockType.PAGE,
        ...this.lib.pages.get(blockDef.slug)!,
      };

    case BlockType.PAGE_SET:
      return {
        type: BlockType.PAGE_SET,
        title: blockDef.title,
        items: blockDef.items.map((item) => this.lib.pages.get(item)!),
      };

    case BlockType.POST:
      return {
        type: BlockType.POST,
        ...this.lib.posts.get(blockDef.slug)!.render(),
      };

    case BlockType.POST_LIST:
      if (blockDef.tag && typeof this.lib.tags.get(blockDef.tag) === 'undefined') {
        throw new Error();
      }

      return {
        type: BlockType.POST_LIST,
        title: blockDef.title,
        items: (blockDef.tag ? this.lib.tags.get(blockDef.tag)! : this.lib.postsByDate)
          .slice(0, blockDef.itemCount),
        link: blockDef.link,
        tag: blockDef.tag,
      };

    case BlockType.POST_SET:
      return {
        type: BlockType.POST_SET,
        title: blockDef.title,
        items: blockDef.items.map((item) => this.lib.posts.get(item)!),
      };
    }
  }
}

type Slug = string;
type Tag = string;

enum SourceDirEnum {
  PAGE = 'pages',
  POST = 'posts',
  BLOCK = 'blocks',
}
