import { inject, injectable } from 'tsyringe';
import { IServicesRepository } from '../domain/interfaces/IServicesRepository';
import { ServiceResponseDTO } from '../domain/dtos/ServiceReponse.dto';
import { UpdateServiceDTO } from '../domain/dtos/UpdateService.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';

@injectable()
export class UpdateServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(updateService: UpdateServiceDTO): Promise<ServiceResponseDTO> {
    
    const service = await this.servicesRepository.findById(updateService.id);

    if(!service){
      throw new BadRequestError('Service not founded')
    }
    
    service.type = updateService.type;
    service.time = updateService.time;
    service.price = updateService.price;
    service.autoschedule = updateService.autoschedule;

    const response = await this.servicesRepository.save(service);

    return new ServiceResponseDTO(
      response.id, 
      response.type,  
      response.time, 
      response.price,
      response.autoschedule,
    );
  }
}
