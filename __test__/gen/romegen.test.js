const romegen = require('../../src/gen/romegen.js');

describe('romegen', () => {
  describe('parse', () => {
    it('should convert romain numerals to decimal', () => {
      expect(romegen.parse('MMXIX')).toBe(2019);
      expect(romegen.parse('MCIX')).toBe(1109);
      expect(romegen.parse('MMMDCCCXXXII')).toBe(3832);
      expect(romegen.parse('MMMCMXCIX')).toBe(3999);
    });

    it('should return an error if value is larger than 3999', () => {
      expect.assertions(2);
      try {
        romegen.parse('MMMMMMMM');
      } catch (e) {
        expect(e.message).toBe('Cannot parse, as value is larger than 3999');
      }

      try {
        const value = romegen.parse('MMMCMXCIX');
        expect(value).toBe(3999);
      } catch (_) {
        throw new Error('Should not throw error');
      }
    });

    it('should throw error for invalid strings', () => {
      expect.assertions(1);

      try {
        romegen.parse('LM');
      } catch (e) {
        expect(e.message).toBe('Invalid roman numerals');
      }
    });
  });
});
