import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('purchases')
export class PurchaseOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  supplier_id!: number;

  @Column('real')
  total!: number;

  @Column()
  received_date!: string;

  @Column()
  status!: string;

  @Column({ type: 'text', nullable: true })
  bank_ref!: string | null;
}
