import { CreateScheduleDTO } from "../dtos/CreateSchedule.dto";
import { ISchedule } from "./ISchedule";

export interface IDate {
  startHour: string;
  endHour: string;
  date: Date;
}

export interface ISchedulesRepository {
  create(createSchedule: CreateScheduleDTO): Promise<ISchedule>;
  save(createSchedule: ISchedule): Promise<ISchedule>;
  findAll(): Promise<ISchedule[]>;
  findById(id: number): Promise<ISchedule | null>;
  findByUserId(user_id:number): Promise<ISchedule[] | null>;
  findByDate(date: IDate): Promise<ISchedule | null>;
  remove(schedule: ISchedule): Promise<void>;
}
