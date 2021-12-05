import compression from 'compression';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
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
