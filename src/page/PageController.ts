import { Controller, Get, Inject, Param, Put, Query, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig, MenuConfig } from '../app/types/AppConfig';
import { AppLanguageEnum } from './types/AppLanguageEnum';
import { ContentService } from './ContentService';


@Controller()
export class PageController {
  private contentService: { pl: ContentService, en: ContentService };

  public constructor(
    private configService: ConfigService,
    @Inject('PlContentService') PlContentService: ContentService,
    @Inject('EnContentService') EnContentService: ContentService,
  ) {
    this.contentService = {
      pl: PlContentService,
      en: EnContentService,
    };
  }

  @Get('/')
  @Render('index')
  public index(
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.contentService[lang].getPage('_index');

    return this.makeResponse(lang, { page });
  }

  /*
  @Get('/generator/:page')
  @Render('generator')
  public getGeneratorPage(
    @Param('page') page: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    return this.contentService[lang].getPage(`generator-${page}`);
  }

  @Get('/eclipse-phase/:page')
  @Render('eclipsePhase')
  public getEclipsePhasePage(
    @Param('page') page: string,
  ) {
    return this.contentService[AppLanguageEnum.PL].getPage(`ep-${page}`);
  }
   */

  @Get('/blog')
  @Render('post-list')
  public getPostList(
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
    @Query('itemsPerPage') itemsPerPage = 9,
    @Query('pageNo') pageNo = 1,
  ) {
    const page =  this.contentService[lang].getPage('_blog-list');
    const pager = this.contentService[lang].getPosts(itemsPerPage, pageNo);

    return this.makeResponse(lang, { page, items: pager.getItems(), paging: pager.getInfo() });
  }

  @Get('/post/:post')
  @Render('post')
  public getPost(
    @Param('post') slug: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.contentService[lang].getPost(slug);

    return this.makeResponse(lang, { page });
  }

  @Get('/post/tag/:tag')
  @Render('post-list')
  public getPostsTagged(
    @Param('tag') tag: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
    @Query('itemsPerPage') itemsPerPage = 8,
    @Query('pageNo') pageNo = 1,
  ) {
    const page =  this.contentService[lang].getPage('_blog-list-tag');
    const pager = this.contentService[lang].getPostsByTag(tag, itemsPerPage, pageNo);
    console.log(pager);

    return this.makeResponse(
      lang,
      { page, items: pager.getItems(), paging: pager.getInfo(), search: { by: 'tag', term: tag } },
    );
  }

  @Put('/post')
  public reloadPosts(): void {
    this.contentService[AppLanguageEnum.PL].reload();
    this.contentService[AppLanguageEnum.EN].reload();
  }

  @Get('/:page([a-z0-9\\-]+)')
  @Render('page')
  public getPage(
    @Param('page') slug: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.contentService[lang].getPage(slug);

    return this.makeResponse(lang, { page });
  }

  @Put('/page')
  public reloadPages(): void {
    this.contentService[AppLanguageEnum.PL].reload();
    this.contentService[AppLanguageEnum.EN].reload();
  }

  private makeResponse(lang: AppLanguageEnum, content: Record<string, object>) {
    return {
      meta: this.configService.get<AppConfig>('app.meta'),
      menus: this.configService.get<MenuConfig>(`app.menus.${lang}`),
      ...content,
    };
  }
}
