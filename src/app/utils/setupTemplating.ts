import type { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';

export function setupTemplating(app: NestExpressApplication): void {
  const express = app.getHttpAdapter().getInstance() as Express.Application;

  const assets = __dirname + '/../../../templates/assets';
  const views = __dirname + '/../../../templates/views';

  nunjucks.configure(views, { express, autoescape: false });
  app.useStaticAssets(assets);
  app.setBaseViewsDir(views);
  app.setViewEngine('njk');
  app.set('view cache', true);
}
