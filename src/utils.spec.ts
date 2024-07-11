import { parseCommaSeparated } from './utils';

describe('parseCommaSeparated()', () => {
  it('should return an array', () => {
    const input = 'a.com , b.com';
    const result = parseCommaSeparated(input);
    expect(result).toEqual(['a.com', 'b.com']);
  });
});
