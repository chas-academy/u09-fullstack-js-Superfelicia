import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('App', () => {
  it('should respond with status 200 on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Stäng MongoDB-anslutningen efter alla tester
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
