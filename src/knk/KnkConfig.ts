import { registerAs } from '@nestjs/config';

export const knkConfig = registerAs('knk', () => ({
  lang: {
    supported: ['pl', 'en'],
    default: 'pl',
  },
  numberOfFactions: {
    max: 8,
    default: 4,
  },
}));
