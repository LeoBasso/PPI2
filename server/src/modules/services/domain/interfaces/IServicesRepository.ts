import { CreateServiceDTO } from "../dtos/CreateService.dto";
import { IService } from "./IService";

export interface IServicesRepository {
  create(createService: CreateServiceDTO): Promise<IService>;
  save(service: IService): Promise<IService>;
  findAll(): Promise<IService[]>;
  findById(id: number): Promise<IService | null>;
  remove(service: IService): Promise<void>;
}
