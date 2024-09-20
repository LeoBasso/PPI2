import { CreateScheduleDTO } from "../dtos/CreateSchedule.dto";
import { ISchedule } from "./ISchedule";

export interface ISchedulesRepository {
  create(createSchedule: CreateScheduleDTO): Promise<ISchedule>;
  save(createSchedule: ISchedule): Promise<ISchedule>;
  findAll(user_id:number): Promise<ISchedule[]>;
  findById(id: number): Promise<ISchedule | null>;
  remove(schedule: ISchedule): Promise<void>;
}
