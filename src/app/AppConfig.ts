import { EnvEnum } from './types/EnvEnum';

export const appConfig = () => ({
  env: process.env['NODE_ENV'] || EnvEnum.DEV,
  port: parseInt(process.env['PORT'] || '3000', 10),
});
