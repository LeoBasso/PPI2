import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcryptjs';
import { sign, Secret } from 'jsonwebtoken';
import { IUsersRepository } from '../domain/interfaces/UserRepository.interfece';
import { UpdateProfileDTO } from '../domain/dtos/UpdateProfile.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { EMAIL_ALREADY_USED, USER_NOT_EXISTS } from 'src/shared/consts/ErrorMessagesConsts';
import { UserRespondeDTO } from '../domain/dtos/UserReponse.dto';
import { LoginRespondeDTO } from 'src/modules/auth/domain/dtos/LoginReponse.dto';

@injectable()
export class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(updateProfileDTO: UpdateProfileDTO): Promise<LoginRespondeDTO> {
        const user = await this.usersRepository.findById(updateProfileDTO.id);

        if (!user) {
            throw new BadRequestError(USER_NOT_EXISTS);
        }

        const userUpdateEmail = await this.usersRepository.findByEmail(updateProfileDTO.email);
        console.log(userUpdateEmail);
        console.log(updateProfileDTO);
        
        if (userUpdateEmail.id != updateProfileDTO.id) {
            throw new BadRequestError(EMAIL_ALREADY_USED);
        }
        user.name = updateProfileDTO.name;
        user.email = updateProfileDTO.email;

        await this.usersRepository.save(user);

        const token = sign({}, process.env.JWT_SECRET as Secret, {
            subject: user.id.toString(),
            expiresIn: process.env.JWT_LIFETIME,
          });
      
          const userResponseDTO = new UserRespondeDTO(user.id, user.name, user.email, user.role);
          return new LoginRespondeDTO(userResponseDTO, token);
    }
}