import { ServiceTypes } from "../enums/ServiceTypes.enum";

export class CreateServiceDTO {
  readonly type: string;
  readonly time: number;
  readonly price: number;
}
