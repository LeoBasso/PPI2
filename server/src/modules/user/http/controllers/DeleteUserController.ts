import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteUserService } from '../../services/DeleteUserService';
import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

const usersRepository = new UsersRepository();

export class DeleteUserController {
  public async execute(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(204).send();

  }
}
