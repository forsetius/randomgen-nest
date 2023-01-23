import { HttpException } from '@nestjs/common';
import { FactionFactory } from '../../../src/knk/domain/FactionFactory';
import { KnkGeneratorService } from '../../../src/knk/KnkGeneratorService';

jest.mock('../../../src/app/utils/getData', () => {
  const makeElems = (name: string) => Array(4)
    .fill(0)
    .map((_, i) => `${name} ${String.fromCharCode(i + 65)}`);

  return {
    getSourceData: jest.fn(),
    getSourceDataDir: () => ({
      city: {
        factions: makeElems('City Faction'),
        events: makeElems('City Event'),
        externalRelations: makeElems('City External Relation'),
        internalRelations: makeElems('City Internal Relation'),
        resources: makeElems('City Resource'),
        rumours: makeElems('City Rumour'),
      },
      village: {
        factions: makeElems('Village Faction'),
        events: makeElems('Village Event'),
        externalRelations: makeElems('Village External Relation'),
        internalRelations: makeElems('Village Internal Relation'),
        resources: makeElems('Village Resource'),
        rumours: makeElems('Village Rumour'),
      },
    }),
  };
});

const service = new KnkGeneratorService();

describe('KnkGeneratorService', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('The service correctly sets up factories', () => {
    expect(service['factories']).toBeInstanceOf(Map);
    expect(service['factories'].get('city')).toBeInstanceOf(FactionFactory);
    expect(service['factories'].get('village')).toBeInstanceOf(FactionFactory);
    expect(service['factories'].size).toBe(2);
  });

  test('A result is generated out of existing template', () => {
    expect(() => service.generate('city', 4)).not.toThrow();
  });

  test('An exception is thrown out of non-existing template', () => {
    expect(() => service.generate('capital', 4)).toThrow(HttpException);
  });
});
