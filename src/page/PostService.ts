import * as fsSync from 'fs';
import YAML from 'yaml';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Page } from './types/Page';
import { Post } from './types/Post';
import { BaseArticleService } from './BaseArticleService';
import path from 'path';
import { AppLanguageEnum } from './types/AppLanguageEnum';

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

  public getPosts(start: number, end: number): Post[] {
    return this.postsByCreatedAt.slice(start, end);
  }

  public getPostsByTag(tag: string): Post[] {
    if (!this.tags.has(tag)) {
      throw new NotFoundException(`Tag "${tag}" not found`);
    }

    return this.tags.get(tag)!;
  }

  public load() {
    const sourcePath = path.join(this.BASE_SOURCE_PATH, 'posts', this.lang);
    const dir = fsSync.readdirSync(sourcePath);
    dir.filter((filename: string) => filename.endsWith('.yaml'))
      .forEach((filename: string) => {
        const post = YAML.parse(fsSync.readFileSync(
          path.join(sourcePath, filename),
          { encoding: 'utf8' },
        )) as Post;

        this.populateItem(post);
      });

    this.postsByCreatedAt = Array.from(this.postCollection.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    this.tags.forEach((posts, tag, tags) => {
      tags.set(tag, posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    });
  }

  private populateItem(post: Post): void {
    post = this.renderContents(post);

    this.postCollection.set(post.slug, post);
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
