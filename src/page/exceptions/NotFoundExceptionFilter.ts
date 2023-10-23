import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLanguageEnum } from '../types/AppLanguageEnum';
import { ConfigService } from '@nestjs/config';
import { AppConfig, MenuConfig } from '../../app/types/AppConfig';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(
    private configService: ConfigService,
  ) {
  }

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const lang = ctx.getRequest<Request>().query['lang'] as AppLanguageEnum|undefined ?? AppLanguageEnum.PL;
    const title = lang === AppLanguageEnum.PL
      ? 'Nie znaleziono strony'
      : 'Page not found';

    response.status(HttpStatus.NOT_FOUND).render(
      'error',
      {
        meta: this.configService.get<AppConfig>('app.meta'),
        menus: this.configService.get<MenuConfig>(`app.menus.${lang}`),
        page: {
          title,
          content: exception.message,
          headerImage: 'neo-head.jpg',
        },
      },
    );
  }
}
