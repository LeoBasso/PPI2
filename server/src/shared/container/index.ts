import 'reflect-metadata';
import { BcryptHashProvider } from 'src/modules/auth/providers/HashProvider/implementations/BcryptHashProvider';
import { IHashProvider } from 'src/modules/auth/providers/HashProvider/models/IHashPovider';
import { ISchedulesRepository } from 'src/modules/schedules/domain/interfaces/ISchedulesRepository';
import { SchedulesRepository } from 'src/modules/schedules/typeorm/repositories/SchedulesRepository';
import { IServicesRepository } from 'src/modules/services/domain/interfaces/IServicesRepository';
import { ServicesRepository } from 'src/modules/services/typeorm/repositories/ServicesRepository';
import { IUsersRepository } from 'src/modules/user/domain/interfaces/UserRepository.interfece';
import { UsersRepository } from 'src/modules/user/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);

container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository,
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptHashProvider,
);

