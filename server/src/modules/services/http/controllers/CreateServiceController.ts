import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateServiceService } from '../../services/CreateServiceService';
import { CreateServiceDTO } from '../../domain/dtos/CreateService.dto';

export class CreateServiceController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const createService = container.resolve(CreateServiceService);
    const { type, time, price } = request.body;
    const user_id = request.user.id;

    const createServiceDTO: CreateServiceDTO = {
      type,
      time,
      price,
    };
    const service = await createService.execute(createServiceDTO);

    return response.json(service);
  }
}