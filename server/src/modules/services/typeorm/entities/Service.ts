import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { IService } from '../../domain/interfaces/IService';
import Schedule from 'src/modules/schedules/typeorm/entities/Schedule';

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

  @OneToMany(() => Schedule, schedule => schedule.service)
  schedules: Schedule[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Service;
