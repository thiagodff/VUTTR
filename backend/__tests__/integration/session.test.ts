import faker from 'faker';
import request from 'supertest';

import app from '../../src/app';

import {
  createTypeormConn,
  closeDatabaseConn
} from '../../src/config/database';

describe('Session', () => {
  beforeEach(async () => {
    await createTypeormConn();
  });

  afterEach(async () => {
    await closeDatabaseConn();
  });

  it('should be able to create new session', async () => {
    await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: 'teste@gmail.com',
        password: '123456'
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'teste@gmail.com',
        password: '123456'
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able to create a new session without registered email', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'teste@gmail.com',
        password: '123456'
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a new session with wrong password', async () => {
    await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: 'teste@gmail.com',
        password: '123456'
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'teste@gmail.com',
        password: '123123'
      });

    expect(response.status).toBe(401);
  });
});
