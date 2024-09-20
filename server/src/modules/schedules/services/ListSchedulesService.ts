import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { ISchedule } from '../domain/interfaces/ISchedule';

@injectable()
export class ListSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository) { }

  public async execute(user_id: number): Promise<ISchedule[]> {
    const schedules = await this.schedulesRepository.findAll(user_id);

    schedules.forEach(schedule => {
      const date = new Date(schedule.date);
      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      schedule.date = formattedDate as any;
    });

    return schedules;
  }
}
