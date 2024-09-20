import 'reflect-metadata';
import { IActivitiesRepository } from 'src/modules/activities/domain/interfaces/IActivitiesRepository';
import { ActivitiesRepository } from 'src/modules/activities/typeorm/repositories/ActivitiesRepository';
import { BcryptHashProvider } from 'src/modules/auth/providers/HashProvider/implementations/BcryptHashProvider';
import { IHashProvider } from 'src/modules/auth/providers/HashProvider/models/IHashPovider';
import { IUsersRepository } from 'src/modules/user/domain/interfaces/UserRepository.interfece';
import { UsersRepository } from 'src/modules/user/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IActivitiesRepository>(
  'ActivitiesRepository',
  ActivitiesRepository,
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptHashProvider,
);

