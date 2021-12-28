import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { setupSecurity } from './app/util/setup-security';
import { setupTemplating } from './app/util/setup-templating';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
