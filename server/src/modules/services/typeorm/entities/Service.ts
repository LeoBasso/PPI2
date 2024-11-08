import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { IService } from '../../domain/interfaces/IService';
import Schedule from 'src/modules/schedules/typeorm/entities/Schedule';
import User from 'src/modules/user/typeorm/entities/User';

@Entity('services')
class Service implements IService {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @Column()
  time: number;

  @Column()
  price: number;

  @Column()
  autoschedule: boolean;

  @Column({ type: 'bigint' })
  user_id: number;

  @ManyToOne(() => User, user => user.service)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Schedule, schedule => schedule.service)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Service;
