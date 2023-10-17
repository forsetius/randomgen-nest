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
    const page = this.pageService[lang].getPage('index');
    console.log(this.postService);
    const posts = this.postService[lang].getPosts(0, 2);

    return {
      meta: this.configService.get<AppConfig>('app.meta'),
      menus: this.configService.get<MenuConfig>(`app.menus.${lang}`),
      page,
      posts,
    };
  }

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

  @Get('/post/:post')
  @Render('post')
  public getPost(
    @Param('post') post: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    return this.postService[lang].getPost(post);
  }

  @Get('/post/tag/:tag')
  public getPostsTagged(
    @Param('tag') tag: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    return this.postService[lang].getPostsByTag(tag);
  }

  @Put('/post')
  public reloadPosts(): void {
    this.postService[AppLanguageEnum.PL].load();
    this.postService[AppLanguageEnum.EN].load();
  }

  @Get('/:page')
  @Render('page')
  public getPage(
    @Param('page') page: string,
    @Query('lang') lang: AppLanguageEnum = AppLanguageEnum.PL,
  ) {
    return this.pageService[lang].getPage(page);
  }

  @Put('/page')
  public reloadPages(): void {
    this.pageService[AppLanguageEnum.PL].load();
    this.pageService[AppLanguageEnum.EN].load();
  }
}
