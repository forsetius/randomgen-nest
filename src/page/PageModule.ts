import { Module } from '@nestjs/common';
import { PageController } from './PageController';
import { AppLanguageEnum } from './types/AppLanguageEnum';
import { ContentService } from './ContentService';
import { MarkdownService } from './MarkdownService';

@Module({
  controllers: [PageController],
})
export class PageModule {
  static forRoot() {
    const markdownService = new MarkdownService();

    return {
      module: PageModule,
      providers: [
        {
          provide: 'MarkdownService',
          useConstant: markdownService,
        },
        {
          provide: 'PlContentService',
          useFactory: () => new ContentService(markdownService, AppLanguageEnum.PL),
        },
        {
          provide: 'EnContentService',
          useFactory: () => new ContentService(markdownService, AppLanguageEnum.EN),
        },
      ],
    };
  }
}
