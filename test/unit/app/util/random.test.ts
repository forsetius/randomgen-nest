import { flipCoin, roll } from '../../../../src/common/utils/random';

describe('Random utilities', () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test.each([
    [0, 1],
    [0.5, 51],
    [0.99999999, 100],
  ])('roll() wih p = %d', (p, expected) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(p);

    expect(roll(100)).toEqual(expected);
  });

  test.each([
    [0, false],
    [0.499999, false],
    [0.5, true],
    [0.99999999, true],
  ])('flipCoin() wih p = %d', (p, expected) => {
    jest.spyOn(global.Math, 'random').mockReturnValue(p);

    expect(flipCoin()).toEqual(expected);
  });
});
