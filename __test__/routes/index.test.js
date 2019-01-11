const request = require('supertest');
const app = require('../../src/app.js');

describe('Routes /', () => {
  describe('GET /', () => {
    it('should return documentation', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        numerals: '/numerals',
        decimal: '/decimal',
      });
    });
  });

  describe('GET unknown route', () => {
    it('should respond with 404 not found', async () => {
      const response = await request(app).get('/alsdhajshdjksh');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not found' });
    });
  });
});
