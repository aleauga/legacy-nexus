import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('inventory_stock')
export class InventoryStockOrmEntity {
  @PrimaryColumn()
  product_id!: number;

  @PrimaryColumn()
  warehouse_id!: number;

  @Column('int')
  quantity!: number;
}
