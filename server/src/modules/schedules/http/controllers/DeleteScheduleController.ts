import { Request, Response } from 'express';
import { DeleteScheduleService } from '../../services/DeleteScheduleService';
import { SchedulesRepository } from '../../typeorm/repositories/SchedulesRepository';
import { container } from 'tsyringe';

const schedulesRepository = new SchedulesRepository();

export class DeleteScheduleController {
  public async execute(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteSchedule = container.resolve(DeleteScheduleService);

    await deleteSchedule.execute(id);

    return response.status(204).send();

  }
}
