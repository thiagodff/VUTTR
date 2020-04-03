import 'reflect-metadata';
import { createConnections, getConnectionOptions } from 'typeorm';
import { createTypeormConn } from '../config/database';

export const startServer = async () => {
  await createTypeormConn();
};

export const startProductionServer = async () => {
  const connectionOptions = await getConnectionOptions();

  await createConnections([{ ...connectionOptions, name: 'default' }]);
};

if (process.env.NODE_ENV === 'production') {
  startProductionServer();
} else {
  startServer();
}
