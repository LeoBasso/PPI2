import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/interfaces/User.interface';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
