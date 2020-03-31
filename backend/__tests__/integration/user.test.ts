import faker from 'faker';
import request from 'supertest';
import { getConnection } from 'typeorm';

import app from '../../src/app';
import { User } from '../../src/database/entity/User';

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

  it('should encrypt user password when new user created', async () => {
    const user = await getConnection().getRepository(User);
    const createUser = await user.create({
      name: faker.name.findName(),
      email: faker.internet.email()
    });

    await createUser.hashPassword('123456');

    const newUser = await user.save(createUser);

    const compareHash = await newUser.checkPassword('123456');

    expect(compareHash).toBe(true);
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated e-mail', async () => {
    await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: 'email.test@gmail.com',
        password: faker.internet.password()
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: 'email.test@gmail.com',
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });
});

describe('User after signin', () => {
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

  it('should not be able to access with no token', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  it('should not be able to access with wrong token', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer invalidToken');

    expect(response.status).toBe(401);
  });

  it('should be able to show all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${token}`);

    expect(response.body[0]).toHaveProperty('id');
  });

  it('should be able to update user', async () => {
    const response = await request(app)
      .put('/users')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        oldPassword: '123456',
        password: '123123',
        confirmPassword: '123123'
      })
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to change the email to an already exist', async () => {
    await request(app)
      .post('/users')
      .send({
        name: faker.name.findName(),
        email: 'email@email.com',
        password: faker.internet.password()
      });

    const response = await request(app)
      .put('/users')
      .send({
        name: faker.name.findName(),
        email: 'email@email.com'
      })
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able to update password if confirm password are wrong', async () => {
    const response = await request(app)
      .put('/users')
      .send({
        name: faker.name.findName(),
        oldPassword: '123456',
        password: '123123',
        confirmPassword: '123111'
      })
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should not be able to update password if old password are wrong', async () => {
    const response = await request(app)
      .put('/users')
      .send({
        name: faker.name.findName(),
        oldPassword: '112233',
        password: '123123',
        confirmPassword: '123123'
      })
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('should be able to remove an user', async () => {
    const response = await request(app)
      .delete('/users/1')
      .set('Authorization', `bearer ${token}`);

    expect(response.body).toHaveProperty('email');
  });
});
