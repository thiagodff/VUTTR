import { ConnectionOptions } from 'typeorm';
import path from 'path';

const databaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'vuttr',
  entities: [path.resolve(__dirname, '..', 'database', 'entity', '*.ts')],
  synchronize: true,
  logging: false,
};

export default databaseConfig;
