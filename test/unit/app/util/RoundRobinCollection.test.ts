import { RoundRobinCollection } from '../../../../src/app/utils/RoundRobinCollection';

describe('RoundRobinCollection', () => {
  test('Empty collection should throw', () => {
    expect(() => new RoundRobinCollection([])).toThrow();
  });

  test('Should endlessly iterate through the collection', () => {
    const collection = new RoundRobinCollection(['a', 'b', 'c']);

    expect(collection.get()).toBe('a');
    expect(collection.get()).toBe('b');
    expect(collection.get()).toBe('c');
    expect(collection.get()).toBe('a');
  });
});
