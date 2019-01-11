const request = require('supertest');
const app = require('../../src/app.js');
const romegen = require('../../src/gen/romegen.js');

jest.mock('../../src/gen/romegen.js');

describe('Routes /numerals', () => {
  describe('GET /:decimal', () => {
    it('should return generate the roman numerals of the given decimal', async () => {
      romegen.generate.mockReturnValue('MMMCCCC');

      const response = await request(app).get('/numerals/2039');
      expect(romegen.generate).toBeCalledWith(2039);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        value: 'MMMCCCC',
      });

      romegen.generate.mockReturnValue('MMCCLV');

      const response2 = await request(app).get('/numerals/28');
      expect(romegen.generate).toBeCalledWith(28);

      expect(response2.status).toBe(200);
      expect(response2.body).toEqual({
        value: 'MMCCLV',
      });
    });
  });
});
