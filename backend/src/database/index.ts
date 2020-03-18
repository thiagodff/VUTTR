import 'reflect-metadata';
import { createConnection } from 'typeorm';

import databaseConfig from '../config/database';

createConnection(databaseConfig)
  .then()
  // eslint-disable-next-line no-console
  .catch(error => console.log(error));
