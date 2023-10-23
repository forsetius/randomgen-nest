import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  UnprocessableEntityException, HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AppConfig, MenuConfig } from '../../app/types/AppConfig';
import { AppLanguageEnum } from '../types/AppLanguageEnum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Catch(
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  UnprocessableEntityException,
)
export class ClientExceptionFilter implements ExceptionFilter {
  constructor(
    private configService: ConfigService,
  ) {
  }

  catch(_exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const lang = ctx.getRequest<Request>().query['lang'] as AppLanguageEnum|undefined ?? AppLanguageEnum.PL;
    const title = lang === AppLanguageEnum.PL
      ? 'Zabronione'
      : 'Forbidden';

    response.status(HttpStatus.NOT_FOUND).render(
      'error',
      {
        meta: this.configService.get<AppConfig>('app.meta'),
        menus: this.configService.get<MenuConfig>(`app.menus.${lang}`),
        page: {
          title,
          headerImage: 'matrixtrio-head.jpg',
        },
      },
    );
  }
}
