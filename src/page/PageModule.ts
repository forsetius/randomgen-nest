import { Module } from '@nestjs/common';
import { PageController } from './PageController';
import { AppLanguageEnum } from './types/AppLanguageEnum';
import { ContentService } from './ContentService';

@Module({
  controllers: [PageController],
  providers: [
    {
      provide: 'PlContentService',
      useFactory: () => new ContentService(AppLanguageEnum.PL),
    },
    {
      provide: 'EnContentService',
      useFactory: () => new ContentService(AppLanguageEnum.EN),
    },
  ],
})
export class PageModule {}
