import { Request, Response } from 'express';
import { DeleteServiceService } from '../../services/DeleteServiceService';
import { ServicesRepository } from '../../typeorm/repositories/ServicesRepository';
import { container } from 'tsyringe';

const servicesRepository = new ServicesRepository();

export class DeleteServiceController {
  public async execute(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteService = container.resolve(DeleteServiceService);

    await deleteService.execute(id);

    return response.status(204).send();

  }
}
