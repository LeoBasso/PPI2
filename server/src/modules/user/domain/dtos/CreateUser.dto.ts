import { RoleTypes } from "../enums/RoleTypes.enum";

export class CreateUserDTO {
  readonly name: string;
  readonly email: string;
  readonly number: string;
  password: string;
  readonly role: RoleTypes;
}
