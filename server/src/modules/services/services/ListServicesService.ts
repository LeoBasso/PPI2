import { inject, injectable } from 'tsyringe';
import { IServicesRepository } from '../domain/interfaces/IServicesRepository';
import { IService } from '../domain/interfaces/IService';

@injectable()
export class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository) { }

  public async execute(): Promise<IService[]> {
    const services = await this.servicesRepository.findAll();

    return services;
  }
}
