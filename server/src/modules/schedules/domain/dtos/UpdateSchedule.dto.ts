import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class UpdateScheduleDTO {
  readonly id: number;
  date?: Date;
  hour?: string;
  status?: ScheduleTypes;
}
