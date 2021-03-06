const romegen = require('../../src/gen/romegen.js');

describe('romegen', () => {
  describe('parse', () => {
    function expectInvalid(string) {
      try {
        romegen.parse(string);
        throw new Error(`${string} should be invalid`);
      } catch (e) {
        expect(e.message).toBe('Invalid roman numerals');
      }
    }

    it('should convert romain numerals to decimal', () => {
      expect(romegen.parse('MMXIX')).toBe(2019);
      expect(romegen.parse('MCIX')).toBe(1109);
      expect(romegen.parse('MMMDCCCXXXII')).toBe(3832);
      expect(romegen.parse('MMMCMXCIX')).toBe(3999);
      expect(romegen.parse('IV')).toBe(4);
      expect(romegen.parse('CD')).toBe(400);
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
      expectInvalid('VL');
      expectInvalid('LM');
      expectInvalid('asksks');
      expectInvalid('VIIII');
      expectInvalid('XXXXV');
      expectInvalid('IXIXIX');
      expectInvalid('VV');
    });
  });

  describe('generate', () => {
    it('should generate numerals from decimal values', () => {
      expect(romegen.generate(2019)).toBe('MMXIX');
      expect(romegen.generate(2532)).toBe('MMDXXXII');
      expect(romegen.generate(1283)).toBe('MCCLXXXIII');
      expect(romegen.generate(3999)).toBe('MMMCMXCIX');
    });

    it('should throw an error if decimal is less than 1', () => {
      expect.assertions(2);
      try {
        romegen.generate(-1);
      } catch (e) {
        expect(e.message).toBe('Cannot convert values less than 1');
      }

      try {
        romegen.generate(-23823);
      } catch (e) {
        expect(e.message).toBe('Cannot convert values less than 1');
      }
    });

    it('should throw an error if decimal is larger than 3999', () => {
      expect.assertions(2);
      try {
        romegen.generate(4000);
      } catch (e) {
        expect(e.message).toBe('Cannot convert values larger than 3999');
      }

      try {
        romegen.generate(323232);
      } catch (e) {
        expect(e.message).toBe('Cannot convert values larger than 3999');
      }
    });

    it('should throw an error if decimal is not a number', () => {
      expect.assertions(1);

      try {
        romegen.generate('asdkjjasdjh');
      } catch (e) {
        expect(e.message).toBe('A number must be given');
      }
    });
  });
});
