import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { CreateScheduleDTO } from '../domain/dtos/CreateSchedule.dto';
import { ScheduleResponseDTO } from '../domain/dtos/ScheduleReponse.dto';

@injectable()
export class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(createSchedule: CreateScheduleDTO): Promise<ScheduleResponseDTO> {
    console.log(createSchedule)
    
    const response = await this.schedulesRepository.create(createSchedule);

    return new ScheduleResponseDTO(
      response.id, 
      response.date, 
      response.hour,
      response.status, 
      response.service_id,
      response.user_id,
    );
  }
}
