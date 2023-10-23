import { NestExpressApplication } from '@nestjs/platform-express';
import { ClientExceptionFilter } from '../../page/exceptions/ClientExceptionFilter';
import { NotFoundExceptionFilter } from '../../page/exceptions/NotFoundExceptionFilter';
import { ConfigService } from '@nestjs/config';

export function setupErrorHandling(app: NestExpressApplication) {
  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalFilters(
    new ClientExceptionFilter(configService),
    new NotFoundExceptionFilter(configService),
  );
}

