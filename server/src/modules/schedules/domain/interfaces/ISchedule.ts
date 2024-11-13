import { ScheduleHours } from "../enums/ScheduleHours.enum";
import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export interface ISchedule {
  id: number;
  date: Date;
  hour: ScheduleHours;
  endhour: string;
  status: ScheduleTypes;
  service_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}
