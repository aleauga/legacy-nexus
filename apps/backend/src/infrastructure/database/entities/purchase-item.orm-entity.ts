import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('purchase_items')
export class PurchaseItemOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  purchase_id!: number;

  @Column()
  product_id!: number;

  @Column('int')
  qty!: number;

  @Column('real')
  unit_cost!: number;
}
