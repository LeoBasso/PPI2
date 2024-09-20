import { ScheduleTypes } from "../enums/ScheduleTypes.enum";

export class ScheduleResponseDTO {
  readonly id: number;
  readonly date: Date;
  readonly hour: string;
  readonly status: ScheduleTypes;
  readonly user_id: number;
  readonly service_id: number;

  constructor(id: number, date: Date, hour: string, status: ScheduleTypes, user_id: number, service_id: number) {
    this.id = id;
    this.date = date;
    this.hour = hour;
    this.status = status;
    this.user_id = user_id;
    this.service_id = service_id;
  }
}
