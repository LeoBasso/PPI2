import { DataSource } from 'typeorm';
import { CreateUserTable1718991698597 } from './migrations/1718991698597-CreateUserTable';
import { CreateServiceTable1718991698599 } from './migrations/1718991698599-CreateServiceTable';
import { CreateSchedulesTable1719363847201 } from './migrations/1719363847201-CreateSchedulesTable';
import User from 'src/modules/user/typeorm/entities/User';
import Schedule from 'src/modules/schedules/typeorm/entities/Schedule';
import Service from 'src/modules/services/typeorm/entities/Service';
import 'dotenv/config';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Service ,Schedule],
  migrations: [CreateUserTable1718991698597, CreateSchedulesTable1719363847201, CreateServiceTable1718991698599],
  synchronize: false,
  logging: false,
});
