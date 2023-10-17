export interface AppConfig {
  title: string,
  logo: string,
  author: string,
}

export type RawMenuConfig = Record<AppLanguage, (LeafEntry | MenuEntry)>[];

export type MenuConfig = Record<string, (LeafEntry | MenuEntry)[]>;

interface LeafEntry {
  text: string, url: string
}

interface MenuEntry {
  text: string, menu: LeafEntry[]
}

export type AppLanguage = 'pl' | 'en';
