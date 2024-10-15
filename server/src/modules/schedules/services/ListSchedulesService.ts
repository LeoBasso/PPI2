import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { ISchedule } from '../domain/interfaces/ISchedule';
import { IUsersRepository } from 'src/modules/user/domain/interfaces/UserRepository.interfece';

@injectable()
export class ListSchedulesService {
  constructor(
    @inject('SchedulesRepository')
    private schedulesRepository: ISchedulesRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository) { }

  public async execute(id: number): Promise<ISchedule[]> {
    const user = await this.userRepository.findById(id);

    let schedules: ISchedule[];

    if (user?.role == 'admin') {
      schedules = await this.schedulesRepository.findAll();
    } else {
      schedules = await this.schedulesRepository.findByUserId(user?.id);
    }

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
