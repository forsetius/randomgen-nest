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
import { Block } from './domain/blocks/Block';

@Injectable()
export class ContentService {
  private BASE_SOURCE_PATH = path.join(__dirname, '..', '..', 'templates', 'content');

  public readonly pages = new Map<Slug, Page>;
  public readonly posts = new Map<Slug, Post>;
  public readonly tags = new Map<Tag, Post[]>;
  public readonly blocks = new Map<Label, Block>;
  public postsByDate: Post[] = [];

  public constructor(
    public readonly lang: AppLanguageEnum,
  ) {
    this.load();
  }

  public getPage(slug: string): Page {
    if (!this.pages.has(slug)) {
      throw new NotFoundException();
    }

    return this.pages.get(slug)!;
  }

  public getPost(slug: string): Post {
    if (!this.posts.has(slug)) {
      throw new NotFoundException();
    }

    return this.posts.get(slug)!;
  }

  public getPosts(itemsPerPage: number, pageNo: number): Pager<Post> {
    return new Pager(this.postsByDate, itemsPerPage, pageNo);
  }

  public getPostsByTag(tag: string, itemsPerPage: number, pageNo: number): Pager<Post> {
    if (!this.tags.has(tag)) {
      throw new NotFoundException(`Tag "${tag}" not found`);
    }

    return new Pager(this.tags.get(tag)!, itemsPerPage, pageNo);
  }

  public reload(): void {
    this.pages.clear();
    this.posts.clear();
    this.tags.clear();
    this.postsByDate = [];
    this.blocks.clear();

    this.load();
  }

  private load(): void {
    const defs: Defs = {
      pages: this.readSourceFiles<PageDef>(SourceDirEnum.PAGE, this.lang),
      posts: this.readSourceFiles<PostDef>(SourceDirEnum.POST, this.lang),
      blocks: this.readSourceFiles<BlockDef>(SourceDirEnum.BLOCK, this.lang),
    };

    this.populate(defs.pages, (name, def) => { this.pages.set(name, new Page(name, def)); });
    this.populate(
      defs.posts,
      (name, def) => { this.posts.set(name, new Post(name, this.lang, def)); },
    );
    this.populate(defs.blocks, (name, def) => { this.blocks.set(name, Block.create(def, this)); });

    Array.from(this.pages.values()).forEach((page) => {
      page.renderAsides(defs);
    });
    Array.from(this.posts.values()).forEach((post) => {
      post.renderAsides(defs);
    });

    this.postsByDate = Array.from(this.posts.values())
      .sort((a, b) => +b.createdAt - +a.createdAt);

    this.populateTags();
  }

  private populate<D>(
    defs: Record<string, D>,
    fn: (name: string, def: D) => void,
  ): void {
    Object.entries(defs).forEach(([name, def]) => {
      fn(name, def);
    });
  }

  private populateTags(): void {
    for (const post of this.posts.values()) {
      post.tags.forEach((tag) => {
        if (!this.tags.has(tag)) {
          this.tags.set(tag, []);
        }

        this.tags.get(tag)!.push(post);
      });
    }

    for (const [tag, posts] of this.tags) {
      const sorted = Array.from(posts)
        .sort((a, b) => +b.createdAt - +a.createdAt);

      this.tags.set(tag, sorted);
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
}

type Label = string;
type Slug = string;
type Tag = string;

enum SourceDirEnum {
  PAGE = 'pages',
  POST = 'posts',
  BLOCK = 'blocks',
}
