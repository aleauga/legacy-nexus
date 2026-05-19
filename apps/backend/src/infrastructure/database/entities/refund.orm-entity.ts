import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('refunds')
export class RefundOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sale_id!: number;

  @Column()
  user_id!: number;

  @Column('real')
  amount!: number;

  @Column()
  reason!: string;

  @Column()
  status!: string;

  @Column({ type: 'integer', nullable: true })
  approved_by!: number | null;

  @Column({ type: 'datetime' })
  created_at!: Date;
}
