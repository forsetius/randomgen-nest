import type { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';

export function setupSecurity(app: NestExpressApplication): void {
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.use(RateLimit({
    max: 10,
    windowMs: 1000,
  }));
}
