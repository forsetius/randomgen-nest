import { Module } from '@nestjs/common';
import { PageController } from './PageController';
import { PageService } from './PageService';
import { PostService } from './PostService';
import { AppLanguageEnum } from './types/AppLanguageEnum';

@Module({
  controllers: [PageController],
  providers: [
    {
      provide: 'PlPageService',
      useFactory: () => new PageService(AppLanguageEnum.PL),
    },
    {
      provide: 'EnPageService',
      useFactory: () => new PageService(AppLanguageEnum.EN),
    },
    {
      provide: 'PlPostService',
      useFactory: () => new PostService(AppLanguageEnum.PL),
    },
    {
      provide: 'EnPostService',
      useFactory: () => new PostService(AppLanguageEnum.EN),
    },
  ],
})
export class PageModule {}
