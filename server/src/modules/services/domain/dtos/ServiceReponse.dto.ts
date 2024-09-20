
export class ServiceResponseDTO {
  readonly id: number;
  readonly type: string;
  readonly time: number;
  readonly price: number;

  constructor(id: number, type: string, time: number, price: number) {
    this.id = id;
    this.type = type;
    this.time = time;
    this.price = time;
  }
}
