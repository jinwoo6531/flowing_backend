import { ProductStatus } from 'src/products/product.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Store } from './store.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'product_id' })
  id: number;

  @Column('varchar', { name: 'product_title' })
  product_title: string;

  @Column('varchar', { array: true })
  product_images: string[];

  @Column('int', { name: 'product_price' })
  product_price: number;

  @Column('int', { name: 'product_discount_price' })
  product_discount_price: number;

  @Column('date', { name: 'product_start_at' })
  product_start_at: Date;

  @Column('date', { name: 'product_end_at' })
  product_end_at: Date;

  @Column('int', { name: 'product_stock' })
  product_stock: number;

  @Column('char', { name: 'product_use_yn' })
  product_use_yn: ProductStatus;

  @Column('int', { name: 'product_extra_price' })
  product_extra_pridce: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'modified_at',
  })
  modified_at: Date;

  @ManyToOne((type) => Store, (store) => store.products, { eager: false })
  store: Store;
}
