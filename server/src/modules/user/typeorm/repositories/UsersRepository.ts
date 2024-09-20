
import { Repository } from "typeorm";
import { dataSource } from "src/shared/typeorm/dataSource";
import { CreateUserDTO } from "../../domain/dtos/CreateUser.dto";
import User from "../entities/User";
import { IUsersRepository } from "../../domain/interfaces/UserRepository.interfece";
import { IUser } from "../../domain/interfaces/User.interface";


export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create(createUser: CreateUserDTO): Promise<IUser> {
    const user = this.ormRepository.create(createUser);
    return await this.ormRepository.save(user);
  }

  public async save(user: IUser): Promise<IUser> {
    return await this.ormRepository.save(user);
  }

  public async findAll(): Promise<IUser[]> {
    return await this.ormRepository
      .createQueryBuilder('users')
      .getMany();
  }

  public async findByName(name: string): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      name,
    });
  }

  public async findById(id: number): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      id,
    });

  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await this.ormRepository.findOneBy({
      email,
    });
  }

  public async remove(user: IUser): Promise<void> {
    await this.ormRepository.remove(user);
  }
}
