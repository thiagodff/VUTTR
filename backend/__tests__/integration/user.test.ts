import request from 'supertest';

import app from '../../src/app';

import {
  createTypeormConn,
  closeDatabaseConn
} from '../../src/config/database';

describe('User', () => {
  beforeEach(async () => {
    await createTypeormConn();
  });

  afterEach(async () => {
    await closeDatabaseConn();
  });

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
