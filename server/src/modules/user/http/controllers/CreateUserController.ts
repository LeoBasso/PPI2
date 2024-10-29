import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../../services/CreateUserService';
import { CreateUserDTO } from '../../domain/dtos/CreateUser.dto';
import { RoleTypes } from '../../domain/enums/RoleTypes.enum';

export class CreateUserController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const { name, email, number, password } = request.body;
    const createUserDTO: CreateUserDTO = {
      name,
      email,
      number,
      password,
      role:RoleTypes.USER,
    };
    const users = await createUser.execute(createUserDTO);

    return response.json(users);
  }
}
