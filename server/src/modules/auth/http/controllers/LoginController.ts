import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginService } from '../../services/LoginService';
import { LoginDTO } from '../../domain/dtos/Login.dto';

export class LoginController {
  public async execute(request: Request, response: Response): Promise<Response> {
    const login = container.resolve(LoginService);
    const { email, password } = request.body;
    const loginDTO: LoginDTO = {
      email,
      password,
    };

    const loginResponse = await login.execute(loginDTO);

    return response.json(loginResponse);
  }
}
