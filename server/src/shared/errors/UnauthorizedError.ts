import { UNAUTHORIZED } from "../consts/ErrorConsts";

export class UnauthorizedError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.error = UNAUTHORIZED;
  }
}
