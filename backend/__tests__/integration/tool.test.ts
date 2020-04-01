import faker from 'faker';
import request from 'supertest';
// import { getConnection } from 'typeorm';

import app from '../../src/app';
// import { User } from '../../src/database/entity/User';

import {
  createTypeormConn,
  closeDatabaseConn
} from '../../src/config/database';

describe('Tool', () => {
  let token: string;

  beforeEach(async () => {
    await createTypeormConn();

    await request(app)
      .post('/users')
      .send({
        name: 'user',
        email: 'email.test@gmail.com',
        password: '123456'
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'email.test@gmail.com',
        password: '123456'
      });

    token = response.body.token;
  });

  afterEach(async () => {
    await closeDatabaseConn();
  });

  it('should be able to create new tool', async () => {
    const response = await request(app)
      .post('/tools')
      .send({
        title: faker.lorem.word(),
        link: faker.internet.url(),
        description: faker.lorem.sentence(),
        tags: [faker.lorem.word()]
      })
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to remove tool', async () => {
    const newTool = await request(app)
      .post('/tools')
      .send({
        title: faker.lorem.word(),
        link: faker.internet.url(),
        description: faker.lorem.sentence(),
        tags: [faker.lorem.word()]
      })
      .set('Authorization', `bearer ${token}`);

    const response = await request(app)
      .delete(`/tools/${newTool.body.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('should not be able to remove a non-existent tool', async () => {
    const response = await request(app)
      .delete('/tools/5')
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(401);
  });
});
