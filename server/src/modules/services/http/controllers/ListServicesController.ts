import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListServicesService } from '../../services/ListServicesService';

export class ListServicesController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const listServices = container.resolve(ListServicesService);
    const user_id = request.user.id
    const services = await listServices.execute(Number(user_id));

    return response.json(services);
  }
}