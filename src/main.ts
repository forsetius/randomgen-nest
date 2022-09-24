import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { appConfig } from './app/AppConfig';
import { AppModule } from './app/AppModule';
import { setupSecurity } from './app/utils/setupSecurity';
import { setupTemplating } from './app/utils/setupTemplating';

async function bootstrap(): Promise<void> {
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

  await app.listen(config.port);
}

void bootstrap();
