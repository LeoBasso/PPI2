import { inject, injectable } from "tsyringe";
import { IServicesRepository } from "../domain/interfaces/IServicesRepository";
import { BadRequestError } from "src/shared/errors/BadRequestError";

@injectable()
export class DeleteServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository) { }

  public async execute(id: number): Promise<void> {
    const service = await this.servicesRepository.findById(id);

    if (!service) {
      throw new BadRequestError('Service not founded')
    }

    await this.servicesRepository.remove(service);
  }
}
