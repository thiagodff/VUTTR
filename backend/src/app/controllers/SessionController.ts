import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import { User } from '../../database/entity/User';

export default {
  async store(req: Request, res: Response): Promise<Response> {
    const users = await getConnection().getRepository(User);
    const { email, password } = req.body;

    const findUser = await users.findOneOrFail({ where: { email } });

    if (!findUser) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await findUser.checkPassword(password))) {
      return res.status(401).json({ error: 'Password incorrect' });
    }

    const { id, name } = findUser;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
};
