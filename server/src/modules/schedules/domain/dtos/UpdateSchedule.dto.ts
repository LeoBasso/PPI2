import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class UpdateScheduleDTO {
  readonly id: number;
  date?: Date;
  hour?: string;
  endhour?: string;
  status?: ScheduleTypes;
  readonly service_id?: number;
}
