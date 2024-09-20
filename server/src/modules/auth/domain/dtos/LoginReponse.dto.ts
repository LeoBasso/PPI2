import { UserRespondeDTO } from "src/modules/user/domain/dtos/UserReponse.dto";

export class LoginRespondeDTO {
  readonly user: UserRespondeDTO;
  readonly token: string;

  constructor(user: UserRespondeDTO, token: string) {
    Object.assign(this, { user, token });
  }
}
