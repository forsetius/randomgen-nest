import { RollableCollection } from '../../../../src/app/util/RollableCollection';

describe('RollableCollection', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test.each([
    [0, 'a'],
    [0.5, 'c'],
    [0.99999999, 'e'],
  ])('- gets random element wih p = %d', (p, expected) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(p);

    const coll = new RollableCollection(['a', 'b', 'c', 'd', 'e']);
    expect(coll.get()).toEqual(expected);
  });
});
