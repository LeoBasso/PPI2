import { inject, injectable } from 'tsyringe';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import { IUsersRepository } from 'src/modules/user/domain/interfaces/UserRepository.interfece';
import { sign, Secret } from 'jsonwebtoken';
import { LoginDTO } from '../domain/dtos/Login.dto';
import { LoginRespondeDTO } from '../domain/dtos/LoginReponse.dto';
import { UserRespondeDTO } from 'src/modules/user/domain/dtos/UserReponse.dto';

@injectable()
export class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(loginDTO: LoginDTO): Promise<LoginRespondeDTO> {
    const user = await this.usersRepository.findByEmail(loginDTO.email);

    if (!user) {
      throw new BadRequestError('Incorrect email');
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      loginDTO.password,
      user.password,
    );

    if (!passwordConfirmed) {
      throw new BadRequestError('Incorrect email/password combination');
    }

    const token = sign({}, process.env.JWT_SECRET as Secret, {
      subject: user.id.toString(),
      expiresIn: process.env.JWT_LIFETIME,
    });

    const userResponseDTO = new UserRespondeDTO(user.id, user.name, user.email, user.number, user.role);
    return new LoginRespondeDTO(userResponseDTO, token);
  }
}
