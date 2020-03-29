import 'reflect-metadata';

import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Thiago',
        email: 'thiago@gmail.com',
        password: '123456'
      });

    expect(response.body).toHaveProperty('id');
  });
});
