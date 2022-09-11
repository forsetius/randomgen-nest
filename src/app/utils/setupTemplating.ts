import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';

export function setupTemplating(app: NestExpressApplication): void {
  const express = app.getHttpAdapter().getInstance() as Express.Application;

  const assets = '../../../templates/assets';
  const views = '../../../templates/views';

  nunjucks.configure(views, { express });

  app.useStaticAssets(assets);
  app.setBaseViewsDir(views);
  app.setViewEngine('njk');
  app.set('view cache', true);
}
