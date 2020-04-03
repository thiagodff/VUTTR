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

  if (await user.findOne({ where: { email } })) {
    return res.status(400).json({ error: { message: 'Duplicated e-mail' } });
  }

  const createUser = await user.create({
    name,
    email
  });

  await createUser.hashPassword(password);

  const { id } = await user.save(createUser);

  return res.json({ id, name, email });
}

export async function update(req: Request, res: Response): Promise<object> {
  const user = await getConnection().getRepository(User);

  // eslint-disable-next-line object-curly-newline
  const { email, oldPassword, password, confirmPassword, name } = req.body;

  const updateUser = await user.findOneOrFail({ where: { id: req.userId } });

  if (email !== updateUser.email) {
    const userExists = await user.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    updateUser.email = email;
  }

  if (password !== confirmPassword) {
    return res
      .status(401)
      .json({ error: 'Password and confirm password does not match.' });
  }

  if (oldPassword && password) {
    if (!(await updateUser.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }
    await updateUser.hashPassword(password);
  }

  if (name) {
    updateUser.name = name;
  }

  await user.save(updateUser);

  return res.json(updateUser);
}

export async function remove(req: Request, res: Response): Promise<object> {
  const users = await getConnection().getRepository(User);

  const user = await users.findOneOrFail({ where: { id: req.params.id } });

  await users.remove(user);

  return res.json(user);
}
