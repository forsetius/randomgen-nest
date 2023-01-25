import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import type { appConfig } from './app/AppConfig';
import { AppModule } from './app/AppModule';
import { setupSecurity } from './app/utils/setupSecurity';
import { setupTemplating } from './app/utils/setupTemplating';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService).get('app') as ReturnType<typeof appConfig>;

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
  app.useStaticAssets(join(__dirname, '..', 'public'), { index: false });
  app.setBaseViewsDir([
    join(__dirname, 'app', 'view'),
    join(__dirname, 'knk', 'view'),
    join(__dirname, 'technobabble', 'view'),
  ]);
  app.setViewEngine('twing');

  await app.listen(config.port);

  return app;
}

void bootstrap();
