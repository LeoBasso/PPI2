import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToMany 
} from 'typeorm';
import { RoleTypes } from '../../domain/enums/RoleTypes.enum';
import Schedule from 'src/modules/schedules/typeorm/entities/Schedule';
import Service from 'src/modules/services/typeorm/entities/Service';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  number: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    default: RoleTypes.USER
  })
  role: RoleTypes;

  @OneToMany(() => Schedule, schedule => schedule.user)
  schedules: Schedule[];

  @OneToMany(() => Service, service => service.user)
  service: Schedule[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
