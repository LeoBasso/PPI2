import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class ScheduleResponseDTO {
  readonly id: number;
  readonly date: Date;
  readonly hour: string;
  readonly status: ScheduleTypes;

  constructor(id: number, date: Date, hour: string, status: ScheduleTypes) {
    this.id = id;
    this.date = date;
    this.hour = hour;
    this.status = status;
  }
}
