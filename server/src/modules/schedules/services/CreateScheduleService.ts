import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { CreateScheduleDTO } from '../domain/dtos/CreateSchedule.dto';
import { ScheduleResponseDTO } from '../domain/dtos/ScheduleReponse.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { IServicesRepository } from 'src/modules/services/domain/interfaces/IServicesRepository';

@injectable()
export class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) { }

  public async execute(createSchedule: CreateScheduleDTO): Promise<ScheduleResponseDTO> {
    const scheduleDate = new Date(createSchedule.date);
    const [hour, minutes] = createSchedule.hour.split(':').map(Number);
    scheduleDate.setHours(hour, minutes, 0, 0);

    const service = await this.servicesRepository.findById(createSchedule.service_id);

    if (!service) {
      throw new BadRequestError('Este serviço não existe');
    }

    const endhourDate = new Date(scheduleDate.getTime() + service.time * 60 * 1000);

    const formattedEndhour = `${endhourDate.getHours().toString().padStart(2, '0')}:${endhourDate.getMinutes().toString().padStart(2, '0')}`;

    const exists = await this.schedulesRepository.findByDate({
      date: createSchedule.date,
      startHour: createSchedule.hour,
      endHour: formattedEndhour,
    });

    if (exists) {
      throw new BadRequestError('Já existe outro agendamento neste horário');
    }

    const response = await this.schedulesRepository.create({ ...createSchedule, endhour: formattedEndhour });

    return new ScheduleResponseDTO(
      response.id,
      response.date,
      response.hour,
      response.endhour,
      response.status,
    );
  }
}
