import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(RateLimit({
    max: 10,
    windowMs: 1000,
  }));

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
