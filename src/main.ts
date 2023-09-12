import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { appConfig } from './app/AppConfig';
import { AppModule } from './app/AppModule';
import { setupSecurity } from './app/utils/setupSecurity';
import { setupTemplating } from './app/utils/setupTemplating';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService).get<typeof appConfig>('app')!;

  app.enableShutdownHooks();
  setupSecurity(app);
  setupTemplating(app);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.env.startsWith('prod'),
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(config.port);

  return app;
}

void bootstrap();
