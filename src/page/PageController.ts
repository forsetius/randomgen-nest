import { Controller, Get, Inject, Param, Put, Query, Render } from '@nestjs/common';
import { PageService } from './PageService';
import { PostService } from './PostService';
import { ConfigService } from '@nestjs/config';
import { AppConfig, MenuConfig } from '../app/types/AppConfig';
import { AppLanguageEnum } from './types/AppLanguageEnum';


@Controller()
export class PageController {
  private pageService: { pl: PageService, en: PageService };
  private postService: { pl: PostService, en: PostService };

  public constructor(
    private configService: ConfigService,
    @Inject('PlPageService') plPageService: PageService,
    @Inject('EnPageService') enPageService: PageService,
    @Inject('PlPostService') plPostService: PostService,
    @Inject('EnPostService') enPostService: PostService,
  ) {
    this.pageService = {
      pl: plPageService,
      en: enPageService,
    };
    this.postService = {
      pl: plPostService,
      en: enPostService,
    };
  }

  @Get('/')
  @Render('index')
  public index(
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.pageService[lang].getPage('_index');
    const posts = this.postService[lang].getPosts(3, 1);

    return this.makeResponse(lang, { page, posts: posts.getItems() });
  }

  /*
  @Get('/generator/:page')
  @Render('generator')
  public getGeneratorPage(
    @Param('page') page: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    return this.pageService[lang].getPage(`generator-${page}`);
  }

  @Get('/eclipse-phase/:page')
  @Render('eclipsePhase')
  public getEclipsePhasePage(
    @Param('page') page: string,
  ) {
    return this.pageService[AppLanguageEnum.PL].getPage(`ep-${page}`);
  }
   */

  @Get('/blog')
  @Render('post-list')
  public getPostList(
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
    @Query('itemsPerPage') itemsPerPage = 9,
    @Query('pageNo') pageNo = 1,
  ) {
    const page =  this.pageService[lang].getPage('_blog-list');
    const pager = this.postService[lang].getPosts(itemsPerPage, pageNo);

    return this.makeResponse(lang, { page, items: pager.getItems(), paging: pager.getInfo() });
  }

  @Get('/post/:post')
  @Render('post')
  public getPost(
    @Param('post') slug: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.postService[lang].getPost(slug);

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
    const page =  this.pageService[lang].getPage('_blog-list-tag');
    const pager = this.postService[lang].getPostsByTag(tag, itemsPerPage, pageNo);
    console.log(pager);

    return this.makeResponse(
      lang,
      { page, items: pager.getItems(), paging: pager.getInfo(), search: { by: 'tag', term: tag } },
    );
  }

  @Put('/post')
  public reloadPosts(): void {
    this.postService[AppLanguageEnum.PL].load();
    this.postService[AppLanguageEnum.EN].load();
  }


  @Get('/:page([a-z0-9\\-]+)')
  @Render('page')
  public getPage(
    @Param('page') slug: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    const page = this.pageService[lang].getPage(slug);

    return this.makeResponse(lang, { page });
  }

  @Put('/page')
  public reloadPages(): void {
    this.pageService[AppLanguageEnum.PL].load();
    this.pageService[AppLanguageEnum.EN].load();
  }

  private makeResponse(lang: AppLanguageEnum, content: Record<string, object>) {
    return {
      meta: this.configService.get<AppConfig>('app.meta'),
      menus: this.configService.get<MenuConfig>(`app.menus.${lang}`),
      ...content,
    };
  }
}
