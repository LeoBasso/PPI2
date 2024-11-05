import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateScheduleService } from '../../services/CreateScheduleService';
import { CreateScheduleDTO } from '../../domain/dtos/CreateSchedule.dto';

export class CreateScheduleController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createSchedule = container.resolve(CreateScheduleService);
    const { date, hour, endhour, status, service_id } = request.body;
    const user_id = request.user.id;

    const createScheduleDTO: CreateScheduleDTO = {
      date,
      hour,
      endhour,
      status,
      user_id,
      service_id,
    };
    const schedule = await createSchedule.execute(createScheduleDTO);

    return response.json(schedule);
  }
}
