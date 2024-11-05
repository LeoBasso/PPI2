import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from 'src/modules/user/typeorm/entities/User';
import Service from 'src/modules/services/typeorm/entities/Service';
import { ScheduleTypes } from '../../domain/enums/ScheduleTypes.enum';
import { ISchedule } from '../../domain/interfaces/ISchedule';

@Entity('schedules')
class Schedule implements ISchedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  hour: string;

  @Column()
  endhour: string;

  @Column({
    type: 'enum',
    enum: ScheduleTypes,
  })
  status: ScheduleTypes;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  service_id: number;

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Service, service => service.schedules)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Schedule;
