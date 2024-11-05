import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class ScheduleResponseDTO {
  readonly id: number;
  readonly date: Date;
  readonly hour: string;
  readonly endhour: string
  readonly status: ScheduleTypes;

  constructor(id: number, date: Date, hour: string, endhour:string, status: ScheduleTypes) {
    this.id = id;
    this.date = date;
    this.hour = hour;
    this.endhour = endhour;
    this.status = status;
  }
}
