import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as classValidator from 'class-validator';
import { AppModule } from './app/AppModule';
import { setupSecurity } from './common/utils/setupSecurity';
import { setupTemplating } from './common/utils/setupTemplating';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  classValidator.useContainer(app, { fallback: true });

  app.enableShutdownHooks();
  setupSecurity(app);
  setupTemplating(app);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: process.env['NODE_ENV']?.startsWith('prod') ?? false,
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env['PORT'] ?? 3000);
}

void bootstrap();
