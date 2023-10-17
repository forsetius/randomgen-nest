import { marked } from 'marked';
import { Page } from './types/Page';
import { Aside } from './types/Aside';
import path from 'path';

export abstract class BaseArticleService {
  protected BASE_SOURCE_PATH = path.join(__dirname, '..', '..', 'templates', 'content');

  public abstract load(): void;

  protected renderContents<T extends Page>(page: T): T {
    page.lead = marked.parse(page.lead ?? '');
    page.content = marked.parse(page.content);
    page.asides = page.asides?.map((aside: Aside) => {
      aside.content = marked.parse(page.content);

      return aside;
    });

    return page;
  }
}
