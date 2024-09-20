import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { ScheduleResponseDTO } from '../domain/dtos/ScheduleReponse.dto';
import { UpdateScheduleDTO } from '../domain/dtos/UpdateSchedule.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { ScheduleTypes } from '../domain/enums/ScheduleTypes.enum';

@injectable()
export class UpdateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(updateSchedule: UpdateScheduleDTO): Promise<ScheduleResponseDTO> {
    
    
    const schedule = await this.schedulesRepository.findById(updateSchedule.id);

    if(!schedule){
      throw new BadRequestError('Schedule not founded')
    }

    schedule.date = updateSchedule.date;
    schedule.hour = updateSchedule.hour;
    schedule.status = updateSchedule.status;

    const response = await this.schedulesRepository.save(schedule);

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
