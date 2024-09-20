import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateScheduleService } from '../../services/UpdateScheduleService';
import { UpdateScheduleDTO } from '../../domain/dtos/UpdateSchedule.dto';

export class UpdateScheduleController {
  public async execute(req: Request, res: Response): Promise<Response> {

      const id = req.params.id;
      const {date, hour, status} = req.body;

      const updateScheduleService = container.resolve(UpdateScheduleService);

      const updateScheduleDTO: UpdateScheduleDTO = {
        id,
        date,
        hour,
        status,
      }

      const updatedSchedule = await updateScheduleService.execute(updateScheduleDTO);

      return res.status(200).json(updatedSchedule);
    }
}
