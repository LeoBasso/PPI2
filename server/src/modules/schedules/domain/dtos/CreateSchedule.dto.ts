import { ScheduleTypes } from "../enums/ScheduleTypes.enum";
import { ScheduleHours } from "../enums/ScheduleHours.enum";

export class CreateScheduleDTO {
  readonly date: Date;
  readonly hour: ScheduleHours;
  readonly endhour: string;
  readonly status: ScheduleTypes;
  readonly user_id: number;
  readonly service_id: number;
}
