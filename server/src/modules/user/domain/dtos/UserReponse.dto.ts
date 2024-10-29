import { RoleTypes } from "../enums/RoleTypes.enum";

export class UserRespondeDTO {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly number: string;
  readonly role: RoleTypes;

  constructor(id: number, name: string, email: string, number:string, role: RoleTypes) {
    Object.assign(this, { id, name, email, number, role });
  }
}
