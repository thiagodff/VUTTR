import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';

export const startServer = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return (
    createConnection({ ...connectionOptions, name: 'default' })
      .then()
      // eslint-disable-next-line no-console
      .catch(error => console.log(error))
  );
};

startServer();
