import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class CreateScheduleDTO {
  readonly date: Date;
  readonly hour: string;
  readonly endhour: string;
  readonly status: ScheduleTypes;
  readonly user_id: number;
  readonly service_id: number;
}
