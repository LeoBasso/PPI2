import { inject, injectable } from 'tsyringe';
import { USER_NOT_EXISTS } from 'src/shared/consts/ErrorMessagesConsts';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute(id: number): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new BadRequestError(USER_NOT_EXISTS);
    }
    await this.usersRepository.remove(userExists);
  }
}
