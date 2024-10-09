import { Repository, FindOneOptions } from "typeorm";
import { dataSource } from "src/shared/typeorm/dataSource";
import { IServicesRepository } from "../../domain/interfaces/IServicesRepository";
import { CreateServiceDTO } from "../../domain/dtos/CreateService.dto";
import { IService } from "../../domain/interfaces/IService";
import Service from "../entities/Service";

export class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Service);
  }

  public async create(createService: CreateServiceDTO): Promise<IService> {
    const service = this.ormRepository.create(createService);
    return await this.ormRepository.save(service);
  }

  public async save(service: IService): Promise<IService> {
    return await this.ormRepository.save(service);
  }

  public async findAll(): Promise<IService[]> {
    return await this.ormRepository.find();
  }

  public async findById(id: number): Promise<IService | null> {
    const service = await this.ormRepository.findOneBy({id});
    return service;
  }
  
  public async remove(service: IService): Promise<void> {
    await this.ormRepository.remove(service);
  }
}
