import { inject, injectable } from 'tsyringe';
import { sign, Secret } from 'jsonwebtoken';
import { UpdateUserDTO } from '../domain/dtos/UpdateUser.dto';
import { UserRespondeDTO } from '../domain/dtos/UserReponse.dto';
import { LoginRespondeDTO } from 'src/modules/auth/domain/dtos/LoginReponse.dto';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(updateUserDTO: UpdateUserDTO): Promise<LoginRespondeDTO> {

    const user = await this.usersRepository.findById(updateUserDTO.id);
    if (!user) {
      throw new Error('User not found');
    }

    user.role = updateUserDTO.role;

    await this.usersRepository.save(user);

    const token = sign({}, process.env.JWT_SECRET as Secret, {
      subject: user.id.toString(),
      expiresIn: process.env.JWT_LIFETIME,
    });

    const userResponseDTO = new UserRespondeDTO(user.id, user.name, user.email, user.number, user.role);
    return new LoginRespondeDTO(userResponseDTO, token);
  }
}
