import { EnvEnum } from './types/EnvEnum';

export const appConfig = () => ({
  env: process.env['NODE_ENV'] || EnvEnum.DEV,
  port: parseInt(process.env['PORT'] || '3000', 10),
  www: {
    brand: {
      name: 'Forseti: abstract worlds',
      logo: 'img/logo.png',
      favicon: '/img/favicon.png',
    },
    nav: {
      main: [
        {
          title: 'Eclipse Phase',
          children: [
            { title: 'Frakcje', url: '/ep/factions'},
          ]
        },
        {
          title: 'Fantasy',
          children: [
            { title: 'Frakcje w mieście fantasy', url: '/knk/city'},
            { title: 'Frakcje w lochach', url: '/knk/dungeon'},
          ]
        },
        { 
          title: 'Star Trek', 
          children: [
            { title: 'Technobełkot', url: '/startrek/technobabble' },
          ]
        },
      ],
      footer: []
    }
  }
});
