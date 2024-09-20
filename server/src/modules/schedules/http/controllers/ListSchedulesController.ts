import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSchedulesService } from '../../services/ListSchedulesService';

export class ListSchedulesController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const listSchedules = container.resolve(ListSchedulesService);
    const user_id = request.user.id
    const schedules = await listSchedules.execute(Number(user_id));

    return response.json(schedules);
  }
}