import { EnvEnum } from './types/EnvEnum';

export const appConfig = () => ({
  env: process.env['NODE_ENV'] || EnvEnum.PROD,
  port: parseInt(process.env['PORT'] || '3000', 10),
});
