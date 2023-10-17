import * as fsSync from 'fs';
import path from 'path';
import YAML from 'yaml';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Page } from './types/Page';
import { BaseArticleService } from './BaseArticleService';
import { AppLanguageEnum } from './types/AppLanguageEnum';

@Injectable()
export class PageService extends BaseArticleService{
  private pageCollection = new Map<Name, Page>();

  public constructor(
    protected lang: AppLanguageEnum,
  ) {
    super();

    this.load();
  }

  public getPage(slug: string): Page {
    if (!this.pageCollection.has(slug)) {
      throw new NotFoundException(`Page "${slug}" not found`);
    }

    return this.pageCollection.get(slug)!;
  }

  public load(): void {
    const sourcePath = path.join(this.BASE_SOURCE_PATH, 'pages', this.lang);
    const dir = fsSync.readdirSync(sourcePath);
    dir.filter((filename: string) => filename.endsWith('.yaml'))
      .forEach((filename: string) => {
        const filePath = path.join(sourcePath, filename);
        const page = YAML.parse(fsSync.readFileSync(filePath, { encoding: 'utf8' })) as Page;

        this.populateItem(page);
      });
  }

  private populateItem(page: Page): void {
    this.pageCollection.set(page.slug, this.renderContents(page));
  }
}

type Name = string;
