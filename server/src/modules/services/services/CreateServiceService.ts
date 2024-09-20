import { inject, injectable } from 'tsyringe';
import { IServicesRepository } from '../domain/interfaces/IServicesRepository';
import { CreateServiceDTO } from '../domain/dtos/CreateService.dto';
import { ServiceResponseDTO } from '../domain/dtos/ServiceReponse.dto';
// import { ServiceTypes } from '../domain/enums/ServiceTypes.enum';

@injectable()
export class CreateServiceService {
  constructor(
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(createService: CreateServiceDTO): Promise<ServiceResponseDTO> {
    console.log(createService)
    
    const response = await this.servicesRepository.create(createService);

    return new ServiceResponseDTO(
      response.id, 
      response.type, 
      response.time,
      response.price, 
    );
  }
}
