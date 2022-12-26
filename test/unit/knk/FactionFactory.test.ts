import { FactionFactory } from '../../../src/knk/domain/FactionFactory';
import { mockTemplate } from './mockTemplate';

let factory: FactionFactory;

describe('KnkGeneratorService', () => {
  beforeAll(() => {
    jest.mock('../../../src/app/utils/random', async () => {
      const { Faction } = await import('../../../src/knk/domain/Faction');

      return {
        __esModule: false,
        // ...jest.requireActual('../../../src/app/utils/random'),
        shuffle: jest.fn().mockReturnValue([
          new Faction(4, 'Faction C', '', ''),
          new Faction(1, 'Faction C', '', ''),
          new Faction(3, 'Faction C', '', ''),
        ]),
      };
    });
  });

  beforeEach(() => {
    factory = new FactionFactory(mockTemplate);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('Correct number of factions generated', () => {
    for (let i = 2; i < 8; i++) {
      expect(factory.rollFactions(i)).toHaveLength(i);
    }
  });

  test('All the faction names are unique', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    const NUMBER_OF_FACTIONS = 4;

    const factions = factory.rollFactions(NUMBER_OF_FACTIONS);
    const factionNames = Array.from(new Set(factions.map((el) => el.getLabel())));

    expect(factionNames).toHaveLength(NUMBER_OF_FACTIONS);
  });

  test.each([
    [0, 'Faction A', 'Resource A', 'Internal Relation A'],
    [0.6, 'Faction C', 'Resource C', 'Internal Relation C'],
    [0.99999, 'Faction D', 'Resource D', 'Internal Relation D'],
  ])(
    'A faction gets random type, resource and internal relations for p=%d',
    (p: number, type: string, resource: string, relation: string) => {
      jest.spyOn(global.Math, 'random').mockReturnValue(p);
      const NUMBER_OF_FACTIONS = 2;

      const factions = factory.rollFactions(NUMBER_OF_FACTIONS);

      expect(factions[0]!.type).toBe(type);
      expect(factions[0]!.resource).toBe(resource);
      expect(factions[0]!.internalRelations).toBe(relation);
      expect(factions[0]!.externalRelations.size).toBe(0);
      expect(factions[0]!.rumour).toBe(undefined);
    },
  );

  test(
    'Faction C #2 has external relations set',
    () => {
      const NUMBER_OF_FACTIONS = 3;

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      const factions = factory.rollFactions(NUMBER_OF_FACTIONS);

      jest.spyOn(global.Math, 'random')
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.8);
      factory.rollExternalRelations(factions, 1);

      const results = factions.map((faction) => faction.externalRelations);
      expect(results.length).toBe(3);
      expect(Array.from(results[0]!.entries())).toEqual([
        ['Faction C #2', 'External Relation A'],
      ]);
      expect(Array.from(results[1]!.entries())).toEqual([
        ['Faction C #1', 'External Relation A'],
        ['Faction C #3', 'External Relation D'],
      ]);
      expect(Array.from(results[2]!.entries())).toEqual([
        ['Faction C #2', 'External Relation D'],
      ]);
    },
  );

  test(
    'A faction has its rumour set',
    () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
      const NUMBER_OF_FACTIONS = 4;

      const factions = factory.rollFactions(NUMBER_OF_FACTIONS);
      const names = factions.map((faction) => faction.getLabel());
      const event = factory.rollRumour(factions, 1);

      expect(event).toBe(`${names[1]!} has Rumour with ${names[0]!} and ${names[3]!} C`);
    },
  );

  test('Substitutes tokens', () => {
    const NUMBER_OF_FACTIONS = 4;

    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    const factions = factory.rollFactions(NUMBER_OF_FACTIONS);
    const result = factory['substituteTokens']('Faction %1% with %2% against %3%. Again %2% and %1%', factions);

    expect(result).toBe(
      'Faction Faction C #1 with Faction C #4 against Faction C #2. Again Faction C #4 and Faction C #1',
    );
  });

  test(
    'An event is set',
    () => {
      const NUMBER_OF_FACTIONS = 4;

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

      const factions = factory.rollFactions(NUMBER_OF_FACTIONS);
      const names = factions.map((faction) => faction.getLabel());
      const event = factory.rollEvent(factions);

      expect(event).toBe(`Event with ${names[0]!} and ${names[3]!} C`);
    },
  );
});
