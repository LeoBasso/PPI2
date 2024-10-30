import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { CreateScheduleDTO } from '../domain/dtos/CreateSchedule.dto';
import { ScheduleResponseDTO } from '../domain/dtos/ScheduleReponse.dto';
import { BadRequestError } from 'src/shared/errors/BadRequestError';

@injectable()
export class CreateScheduleService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
  ) {}

  public async execute(createSchedule: CreateScheduleDTO): Promise<ScheduleResponseDTO> {

    const scheduleDate = new Date(createSchedule.date);
    const scheduleHour = parseInt(createSchedule.hour.split(':')[0]);
    const dayOfWeek = scheduleDate.getUTCDay();

    if (dayOfWeek === 0 || dayOfWeek === 6 || scheduleHour < 13 || scheduleHour > 17) {
      throw new BadRequestError('Agendamentos só são permitidos de segunda a sexta, das 13h às 18h.');
    }

    // const exists = await this.schedulesRepository.findByDate({ date: null, startHour: createSchedule.hour, endHour: null });

    // if (!exists) {
    //   throw new BadRequestError('Já existe outro agendamento neste horário')
    // }

    const response = await this.schedulesRepository.create(createSchedule);

    return new ScheduleResponseDTO(
      response.id,
      response.date,
      response.hour,
      response.status,
    );
  }
}
