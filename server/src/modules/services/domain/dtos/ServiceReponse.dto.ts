
export class ServiceResponseDTO {
  readonly id: number;
  readonly type: string;
  readonly time: number;
  readonly price: number;
  readonly autoschedule: boolean;

  constructor(id: number, type: string, time: number, price: number, autoschedule: boolean) {
    this.id = id;
    this.type = type;
    this.time = time;
    this.price = time;
    this.autoschedule = autoschedule;
  }
}
