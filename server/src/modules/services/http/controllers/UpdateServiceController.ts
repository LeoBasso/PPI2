import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateServiceService } from '../../services/UpdateServiceService';
import { UpdateServiceDTO } from '../../domain/dtos/UpdateService.dto';

export class UpdateServiceController {
  public async execute(req: Request, res: Response): Promise<Response> {

      const id = req.params.id;
      const {type, time, price, autoschedule} = req.body;

      const updateServiceService = container.resolve(UpdateServiceService);

      const updateServiceDTO: UpdateServiceDTO = {
        id,
        type,
        time,
        price,
        autoschedule,
      }

      const updatedService = await updateServiceService.execute(updateServiceDTO);

      return res.status(200).json(updatedService);
    }
}
