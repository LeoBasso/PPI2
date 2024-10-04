import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateScheduleService } from '../../services/CreateScheduleService';
import { CreateScheduleDTO } from '../../domain/dtos/CreateSchedule.dto';

export class CreateScheduleController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createSchedule = container.resolve(CreateScheduleService);
    const { date, hour, status, user_id, service_id } = request.body;

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
