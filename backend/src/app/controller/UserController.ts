import { Request, Response } from 'express';

import { getConnection } from 'typeorm';
import { User } from '../../database/entity/User';

export async function index(req: Request, res: Response): Promise<object> {
  const users = await getConnection()
    .getRepository(User)
    .find();

  return res.json(users);
}

export async function store(req: Request, res: Response): Promise<object> {
  const user = await getConnection().getRepository(User);

  const { name, email, password } = req.body;

  if (user.find({ where: { email } })) {
    return res.status(401).json({ error: { message: 'E-mail já cadastrado' } });
  }

  const createUser = await user.create({
    name,
    email,
  });

  await createUser.hashPassword(password);

  const saveUser = await user.save(createUser);

  return res.json(saveUser);
}

export async function update(req: Request, res: Response): Promise<object> {
  const user = await getConnection().getRepository(User);

  const { email } = req.body;

  const updateUser = user.find({ where: { email } });

  if (updateUser) {
    return res
      .status(401)
      .json({ error: { message: 'Usuário não encontrado' } });
  }
  return res.json(user);
}
