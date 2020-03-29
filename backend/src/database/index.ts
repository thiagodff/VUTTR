import 'reflect-metadata';
import { createTypeormConn } from '../config/database';

export const startServer = async () => {
  await createTypeormConn();
};

startServer();
