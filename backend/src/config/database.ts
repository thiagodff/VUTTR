/* eslint-disable prettier/prettier */
import '../bootstrap';

import { ConnectionOptions } from 'typeorm';
import path from 'path';


// eslint-disable-next-line operator-linebreak
const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.resolve(__dirname, '..', 'database', 'entity', '*.ts')],
  synchronize: true,
  logging: false
};

export default databaseConfig;
