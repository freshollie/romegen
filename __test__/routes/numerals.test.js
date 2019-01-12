const request = require('supertest');
const app = require('../../src/app.js');
const romegen = require('../../src/gen/romegen.js');

jest.mock('../../src/gen/romegen.js');

describe('Routes /numerals', () => {
  describe('GET /', () => {
    it('should respond with an error', async () => {
      const response = await request(app).get('/numerals');

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'A number to convert is required',
      });
    });
  });

  describe('GET /:decimal', () => {
    it('should return the generated roman numerals of the given decimal', async () => {
      romegen.generate.mockReturnValue('MMMCCCC');

      const response = await request(app).get('/numerals/2039');
      expect(romegen.generate).toBeCalledWith('2039');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        value: 'MMMCCCC',
      });

      romegen.generate.mockReturnValue('MMCCLV');

      const response2 = await request(app).get('/numerals/28');
      expect(romegen.generate).toBeCalledWith('28');

      expect(response2.status).toBe(200);
      expect(response2.body).toEqual({
        value: 'MMCCLV',
      });
    });

    it('should respond with any error from the generator', async () => {
      romegen.generate.mockImplementation(() => {
        throw new Error('Some error');
      });

      const response = await request(app).get('/numerals/8283');

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'Some error',
      });

      romegen.generate.mockImplementation(() => {
        throw new Error('Some other error');
      });

      const response2 = await request(app).get('/numerals/8283');

      expect(response2.status).toBe(422);
      expect(response2.body).toEqual({
        error: 'Some other error',
      });
    });
  });
});
