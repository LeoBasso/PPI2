import { NextFunction, Request, Response } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { INVALID_BEARER_TOKEN, JWT_MISSING } from '../consts/ErrorMessagesConsts';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError(JWT_MISSING);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, process.env.JWT_SECRET as Secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new UnauthorizedError(INVALID_BEARER_TOKEN);
  }
}
