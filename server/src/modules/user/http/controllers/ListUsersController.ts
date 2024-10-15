import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersService } from '../../services/ListUsersService';

export class ListUsersController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute();

    return response.json(users);
  }
}