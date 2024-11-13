import { Repository, FindOneOptions } from "typeorm";
import { dataSource } from "src/shared/typeorm/dataSource";
import { IDate, ISchedulesRepository } from "../../domain/interfaces/ISchedulesRepository";
import { CreateScheduleDTO } from "../../domain/dtos/CreateSchedule.dto";
import { ISchedule } from "../../domain/interfaces/ISchedule";
import Schedule from "../entities/Schedule";
import { ScheduleHours } from "../../domain/enums/ScheduleHours.enum";

export class SchedulesRepository implements ISchedulesRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Schedule);
  }

  public async create(createSchedule: CreateScheduleDTO): Promise<ISchedule> {
    const schedule = this.ormRepository.create(createSchedule);
    return await this.ormRepository.save(schedule);
  }

  public async save(schedule: ISchedule): Promise<ISchedule> {
    return await this.ormRepository.save(schedule);
  }

  public async findAll(): Promise<ISchedule[]> {
    return await this.ormRepository.find();
  }

  public async findByUserId(user_id: number): Promise<ISchedule[]> {
    return await this.ormRepository.find({ where: { user_id } });
  }

  public async findById(id: number): Promise<ISchedule | null> {
    const schedule = await this.ormRepository.findOneBy({ id });
    return schedule;
  }

  public async findByDate(date: IDate): Promise<ISchedule | null> {
    console.log(date.date);
    const schedule = await this.ormRepository.findOne({
      where: { date: date.date, hour: date.startHour as ScheduleHours },
    });
    console.log(schedule);
    return schedule;
  }

  public async remove(schedule: ISchedule): Promise<void> {
    await this.ormRepository.remove(schedule);
  }
}
