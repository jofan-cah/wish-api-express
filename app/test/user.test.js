const request = require('supertest');
const app = require('../../server');

it('should retrieve a list of users when GET /users', async (done) => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done(); // Menyelesaikan operasi asinkron
  },10000);
  