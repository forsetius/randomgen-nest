import * as fsSync from 'fs';
import YAML from 'yaml';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Page } from './types/Page';
import { Post } from './types/Post';
import { BaseArticleService } from './BaseArticleService';
import path from 'path';
import { AppLanguageEnum } from './types/AppLanguageEnum';
import { Pager } from './types/Pager';
import { DateTime } from 'luxon';

@Injectable()
export class PostService extends BaseArticleService {
  private postCollection = new Map<Name, Post>();
  private postsByCreatedAt: Post[] = [];
  private tags = new Map<Name, Post[]>();

  public constructor(
    protected lang: AppLanguageEnum,
  ) {
    super();

    this.load();
  }

  public getPost(slug: string): Page {
    if (!this.postCollection.has(slug)) {
      throw new NotFoundException(`Post "${slug}" not found`);
    }

    return this.postCollection.get(slug)!;
  }

  public getPosts(itemsPerPage: number, pageNo: number): Pager<Post> {
    return new Pager(this.postsByCreatedAt, itemsPerPage, pageNo);
  }

  public getPostsByTag(tag: string, itemsPerPage: number, pageNo: number): Pager<Post> {
    if (!this.tags.has(tag)) {
      throw new NotFoundException(`Tag "${tag}" not found`);
    }

    return new Pager(this.tags.get(tag)!, itemsPerPage, pageNo);
  }

  public load() {
    this.postCollection.clear();
    this.tags.clear();
    this.postsByCreatedAt = [];

    const sourcePath = path.join(this.BASE_SOURCE_PATH, 'posts', this.lang);
    const dir = fsSync.readdirSync(sourcePath);
    dir.filter((filename: string) => filename.endsWith('.yaml'))
      .forEach((filename: string) => {
        const slug = path.basename(filename, '.yaml');
        const filePath = path.join(sourcePath, filename);

        const post = YAML.parse(fsSync.readFileSync(filePath, { encoding: 'utf8' })) as Post;
        post.createdAt = DateTime.fromFormat(filename.slice(0, 19), 'yyyy-MM-dd_HH-mm-ss');
        post.date = post.createdAt.toLocaleString(DateTime.DATE_FULL, { locale: this.lang });
        post.time = post.createdAt.toLocaleString(DateTime.TIME_SIMPLE, { locale: this.lang });

        this.populateItem(slug, post);
      });

    this.postsByCreatedAt = Array.from(this.postCollection.values())
      .sort((a, b) => +b.createdAt - +a.createdAt);

    this.tags.forEach((posts, tag, tags) => {
      tags.set(
        tag,
        posts.sort((a, b) => +b.createdAt - +a.createdAt),
      );
    });
  }

  private populateItem(slug: string, post: Post): void {
    post = this.renderContents(slug, this.lang, post);

    this.postCollection.set(slug, post);
    this.tags.forEach((posts, tag, tags) => {
      tags.set(tag, posts.filter((postItem) => postItem.slug !== post.slug));
    });
    post.tags.forEach((tag) => {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, []);
      }

      this.tags.get(tag)?.push(post);
    });
  }
}

type Name = string;
