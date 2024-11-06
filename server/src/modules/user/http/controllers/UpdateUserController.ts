import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserService } from '../../services/UpdateUserService';
import { UpdateUserDTO } from '../../domain/dtos/UpdateUser.dto';

export default class UpdateUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { role } = request.body;
    const user_id = request.params.id;

    const updateUserDTO: UpdateUserDTO = {
      id: user_id,
      role,
    };

    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute(updateUserDTO);

    return response.json(user);
  }
}
