import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sales')
export class SaleOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({ type: 'integer', nullable: true })
  product_id!: number | null;

  @Column()
  customer_type!: string;

  @Column('real')
  subtotal!: number;

  @Column({ type: 'text' })
  total!: string;

  @Column()
  status!: string;

  @Column({ type: 'text', nullable: true })
  last_touch_at!: string | null;

  @Column({ type: 'text' })
  created_at!: string;
}
