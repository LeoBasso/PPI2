import { RoleTypes } from "../enums/RoleTypes.enum";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: RoleTypes;
  created_at: Date;
  updated_at: Date;
}
