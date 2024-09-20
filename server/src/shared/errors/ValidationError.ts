import { VALIDATION } from "../consts/ErrorConsts";

export class ValidationError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.error = VALIDATION;
  }
}
