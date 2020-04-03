/* eslint-disable prettier/prettier */
import '../bootstrap';

import {
  getConnectionOptions, createConnection, getConnection, ConnectionOptions
} from 'typeorm';

export const createTypeormConn = async () => {
  let connectionOptions: ConnectionOptions;

  if (process.env.NODE_ENV === 'development') {
    connectionOptions = {
      ...(await getConnectionOptions(process.env.NODE_ENV)),
      host: process.env.DB_HOST
    } as ConnectionOptions;
  } else {
    connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  }

  return createConnection({ ...connectionOptions, name: 'default' });
};

export const closeDatabaseConn = async () => {
  await getConnection().close();
};
