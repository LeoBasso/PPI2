import { inject, injectable } from 'tsyringe';
import { CreateUserDTO } from '../domain/dtos/CreateUser.dto';
import { UserRespondeDTO } from '../domain/dtos/UserReponse.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/ErrorMessagesConsts';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';
import { IHashProvider } from 'src/modules/auth/providers/HashProvider/models/IHashPovider';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute(createUser: CreateUserDTO): Promise<UserRespondeDTO> {
    const emailExists = await this.usersRepository.findByEmail(createUser.email);

    if (emailExists) {
      throw new BadRequestError(EMAIL_ALREADY_USED);
    }

    createUser.password = await this.hashProvider.generateHash(createUser.password);

    const response = await this.usersRepository.create(createUser);

    return new UserRespondeDTO(response.id, response.name, response.email, response.role);
  }
}
