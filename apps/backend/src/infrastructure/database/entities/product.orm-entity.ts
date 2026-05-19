import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sku!: string;

  @Column()
  name!: string;

  @Column('real')
  price!: number;

  @Column()
  category!: string;

  @Column()
  supplier_id!: number;

  @Column({ type: 'datetime', nullable: true })
  deleted_at!: Date | null;
}
