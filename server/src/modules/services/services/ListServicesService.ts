import { inject, injectable } from 'tsyringe';
import { IServicesRepository } from '../domain/interfaces/IServicesRepository';
import { IService } from '../domain/interfaces/IService';

@injectable()
export class ListServicesService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository) { }

  public async execute(user_id: number): Promise<IService[]> {
    const services = await this.servicesRepository.findAll(user_id);

    // services.forEach(service => {
    //   const date = new Date(service.date);
    //   const formattedDate = date.toLocaleDateString('pt-BR', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    //   });
    //   service.date = formattedDate as any;
    // });

    return services;
  }
}
