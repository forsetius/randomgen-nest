import { EnvEnum } from './types/EnvEnum';
import YAML from 'yaml';
import fsSync from 'fs';
import {
  AppConfig,
  AppLanguage,
  MenuConfig,
  RawMenuConfig,
} from './types/AppConfig';

export const appConfig = () => {
  const meta = YAML.parse(fsSync.readFileSync(
    __dirname + '/../../templates/content/config/app.yaml',
    { encoding: 'utf8' },
  )) as AppConfig;

  const rawMenus = YAML.parse(fsSync.readFileSync(
    __dirname + '/../../templates/content/config/menus.yaml',
    { encoding: 'utf8' },
  )) as Record<MenuName, RawMenuConfig>;

  const menus: Record<AppLanguage, MenuConfig> = { pl: {}, en: {} };
  Object.entries(rawMenus).forEach(
    ([menuName, menuDef]) => {
      menus.pl[menuName] = [];
      menus.en[menuName] = [];
      menuDef.forEach(
        (entry) => {
          Object.entries(entry).forEach(
            ([lang, entryDef]) => {
              menus[lang as AppLanguage][menuName]!.push(entryDef);
            },
          );
        },
      );
    },
  );

  return {
    meta,
    menus,
    env: process.env['NODE_ENV'] ?? EnvEnum.DEV,
    port: parseInt(process.env['PORT'] ?? '3000', 10),
  };
};

type MenuName = string;
