import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sale_items')
export class SaleItemOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sale_id!: number;

  @Column()
  product_id!: number;

  @Column('int')
  qty!: number;

  @Column('real')
  unit_price!: number;
}
