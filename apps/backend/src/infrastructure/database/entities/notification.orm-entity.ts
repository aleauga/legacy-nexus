import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifications')
export class NotificationOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column('text')
  message!: string;

  @Column()
  kind!: string;

  @Column()
  status!: string;

  @Column()
  created_at!: string;
}
