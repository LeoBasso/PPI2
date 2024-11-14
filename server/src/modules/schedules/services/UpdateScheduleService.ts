import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { ScheduleResponseDTO } from '../domain/dtos/ScheduleReponse.dto';
import { UpdateScheduleDTO } from '../domain/dtos/UpdateSchedule.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';
import { ScheduleHours } from '../domain/enums/ScheduleHours.enum';
import { IServicesRepository } from 'src/modules/services/domain/interfaces/IServicesRepository';

@injectable()
export class UpdateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('ServicesRepository')
    private servicesRepository: IServicesRepository,
  ) {}

  public async execute(updateSchedule: UpdateScheduleDTO): Promise<ScheduleResponseDTO> {
    const scheduleDate = new Date(updateSchedule.date);
    const dayOfWeek = scheduleDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new BadRequestError('Não é possível criar agendamentos aos sábados e domingos');
    }

    if (scheduleDate < new Date()) {
      throw new BadRequestError('Não é possível criar agendamentos em datas anteriores a hoje');
    }

    const schedule = await this.schedulesRepository.findById(updateSchedule.id);
    if (!schedule) {
      throw new BadRequestError('Schedule not found');
    }

    if (updateSchedule.hour) {
      const [hour, minutes] = updateSchedule.hour.split(':').map(Number);
      scheduleDate.setHours(hour, minutes, 0, 0);
      schedule.hour = updateSchedule.hour as ScheduleHours;

      const service = await this.servicesRepository.findById(updateSchedule.service_id);

      const endhourDate = new Date(scheduleDate.getTime() + service.time * 60 * 1000);
      const formattedEndhour = `${endhourDate.getHours().toString().padStart(2, '0')}:${endhourDate.getMinutes().toString().padStart(2, '0')}`;
      schedule.endhour = formattedEndhour;

      const exists = await this.schedulesRepository.findByDate({
        date: updateSchedule.date,
        startHour: updateSchedule.hour,
        endHour: formattedEndhour,
      });

      if (exists) {
        throw new BadRequestError('Já existe outro agendamento neste horário');
      }

      const allSchedules = await this.schedulesRepository.findAll();
      const conflict = allSchedules.some((existingSchedule) => {
        const scheduleStart = new Date(`${updateSchedule.date}T${updateSchedule.hour}:00`);
        const scheduleEnd = new Date(scheduleStart.getTime() + service.time * 60 * 1000);

        const existingScheduleStart = new Date(`${existingSchedule.date}T${existingSchedule.hour}:00`);
        const existingScheduleEnd = new Date(existingScheduleStart.getTime() + service.time * 60 * 1000);

        return (scheduleStart < existingScheduleEnd && scheduleEnd > existingScheduleStart);
      });

      if (conflict) {
        throw new BadRequestError('O tempo do serviço não se ajusta ao horário selecionado');
      }
    }

    if (updateSchedule.status) {
      schedule.status = updateSchedule.status;
    }
    schedule.date = updateSchedule.date;
    schedule.hour = updateSchedule.hour as ScheduleHours;
    schedule.endhour = updateSchedule.hour;

    const response = await this.schedulesRepository.save(schedule);

    return new ScheduleResponseDTO(
      response.id,
      response.date,
      response.hour,
      response.endhour,
      response.status,
    );
  }
}
