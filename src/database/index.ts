import 'reflect-metadata';
import { createConnection, ConnectionOptions } from 'typeorm';
import { createTypeormConn } from '../config/database';

export const startServer = async () => {
  await createTypeormConn();
};

export const startProductionServer = async () => {
  const connectionOptions: ConnectionOptions = {} as ConnectionOptions;

  await createConnection({ ...connectionOptions, name: 'default' });
};

if (process.env.NODE_ENV === 'production') {
  startProductionServer();
} else {
  startServer();
}
