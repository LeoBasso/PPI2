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

    if (scheduleDate < new Date()) {
      throw new BadRequestError('Não é possível criar agendamentos em datas anteriores a hoje');
    }

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

    const allSchedules = await this.schedulesRepository.findAll();

    const conflict = allSchedules.some((schedule) => {
      const scheduleStart = new Date(`${createSchedule.date}T${createSchedule.hour}:00`);
      const scheduleEnd = new Date(scheduleStart.getTime() + service.time * 60 * 1000);

      const existingScheduleStart = new Date(`${schedule.date}T${schedule.hour}:00`);
      const existingScheduleEnd = new Date(existingScheduleStart.getTime() + service.time * 60 * 1000);

      return (scheduleStart < existingScheduleEnd && scheduleEnd > existingScheduleStart);
    });

    if (conflict) {
      throw new BadRequestError('O tempo do serviço não se ajusta ao horário selecionado');
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
