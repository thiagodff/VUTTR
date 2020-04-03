import 'reflect-metadata';
import { createConnections } from 'typeorm';
import { createTypeormConn } from '../config/database';

export const startServer = async () => {
  await createTypeormConn();
};

export const startProductionServer = async () => {
  await createConnections();
};

if (process.env.NODE_ENV === 'production') {
  startProductionServer();
} else {
  startServer();
}
