import { inject, injectable } from 'tsyringe';
import { ISchedulesRepository } from '../domain/interfaces/ISchedulesRepository';
import { ISchedule } from '../domain/interfaces/ISchedule';
import { IUsersRepository } from 'src/modules/user/domain/interfaces/UserRepository.interfece';
import moment from 'moment';

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
      const formattedDate = moment(schedule.date).local().format('DD/MM/YYYY');
      schedule.date = formattedDate as any;
    });

    return schedules;
  }
}
