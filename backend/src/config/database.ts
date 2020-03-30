/* eslint-disable prettier/prettier */
import '../bootstrap';

import { getConnectionOptions, createConnection, getConnection } from 'typeorm';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDatabaseConn = async () => {
  await getConnection().close();
};
