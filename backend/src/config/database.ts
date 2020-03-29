/* eslint-disable prettier/prettier */
import '../bootstrap';

import { getConnectionOptions, createConnection } from 'typeorm';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: 'default' });
};
