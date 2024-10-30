import { RoleTypes } from "../enums/RoleTypes.enum";

export class UpdateUserDTO {
  readonly id: number;
  readonly role: RoleTypes
}
