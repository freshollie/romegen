const request = require('supertest');
const app = require('../../src/app.js');

describe('Routes /', () => {
  describe('GET /', () => {
    it('should return documentation', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        numerals: '/numerals',
        decimals: '/decimals',
      });
    });
  });
});
