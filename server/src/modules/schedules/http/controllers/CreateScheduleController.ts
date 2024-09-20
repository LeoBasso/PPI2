import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateScheduleService } from '../../services/CreateScheduleService';
import { CreateScheduleDTO } from '../../domain/dtos/CreateSchedule.dto';

export class CreateScheduleController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createSchedule = container.resolve(CreateScheduleService);
    const { date, hour, status } = request.body;
    const user_id = request.user.id;
    const service_id = request.service.id;

    const createScheduleDTO: CreateScheduleDTO = {
      date,
      hour,
      status,
      user_id,
      service_id,
    };
    const schedule = await createSchedule.execute(createScheduleDTO);

    return response.json(schedule);
  }
}
