import { marked } from 'marked';
import { Page } from './types/Page';
import { Block } from './types/Block';
import path from 'path';
import { AppLanguageEnum } from './types/AppLanguageEnum';

export abstract class BaseArticleService {
  protected BASE_SOURCE_PATH = path.join(__dirname, '..', '..', 'templates', 'content');

  public abstract load(): void;

  protected renderContents<T extends Page>(
    slug: string,
    lang: AppLanguageEnum,
    page: T,
  ): T {
    page.slug = slug;
    page.lang = lang;
    page.lead = marked.parse(page.lead ?? '');
    page.content = marked.parse(page.content);
    Object.values(page.blocks ?? {})
      .forEach((region: Block[]) => {
        region.map((block: Block) => {
          block.content = marked.parse(block.content);

          return block;
        });
      });

    return page;
  }
}
