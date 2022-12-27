import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  username: 'postgres',
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [`dist/src/**/**.entity.js`],
  migrations: [`dist/src/migrations/**/*.js`],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
