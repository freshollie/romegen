const request = require('supertest');
const app = require('../../src/app.js');
const romegen = require('../../src/gen/romegen.js');

jest.mock('../../src/gen/romegen.js');

describe('Routes /numerals', () => {
  describe('GET /:numerals', () => {
    it('should parse given numerals and respond with result', async () => {
      romegen.parse.mockReturnValue(3920);

      const response = await request(app).get('/numerals/MMCC');
      expect(romegen.parse).toHaveBeenCalledWith('MMCC');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ decimal: 3920 });

      romegen.parse.mockReturnValue(2939);

      const response2 = await request(app).get('/numerals/MLCC');
      expect(romegen.parse).toHaveBeenCalledWith('MLCC');

      expect(response2.body).toEqual({ decimal: 2939 });
    });

    it('should return error, no value supplied', async () => {
      const response = await request(app).get('/numerals');
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        error: 'A roman numerals string must be given',
      });
    });

    it('should respond with any errors from parse function', async () => {
      romegen.parse.mockImplementation(() => {
        throw new Error('Oh dear, there was some problem with that');
      });

      const response = await request(app).get('/numerals/MMCC');
      expect(romegen.parse).toHaveBeenCalledWith('MMCC');

      expect(response.status).toBe(422);
      expect(response.body).toEqual({ error: 'Oh dear, there was some problem with that' });

      romegen.parse.mockImplementation(() => {
        throw new Error('Another error :(');
      });

      const response2 = await request(app).get('/numerals/MMCC');
      expect(romegen.parse).toHaveBeenCalledWith('MMCC');

      expect(response2.status).toBe(422);
      expect(response2.body).toEqual({ error: 'Another error :(' });
    });
  });
});
