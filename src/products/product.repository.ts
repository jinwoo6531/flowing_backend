import { InternalServerErrorException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { Store } from 'src/entities/store.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { GetProductFilterDto } from './dto/product-filter.dto';
import { ProductStatus } from './product.enum';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    createProductDto: ProductCreateDto,
    store: Store,
  ): Promise<Product> {
    const {
      product_title,
      product_price,
      product_discount_price,
      product_start_at,
      product_end_at,
      product_stock,
      product_extra_price,
    } = createProductDto;

    const product = new Product();
    product.product_title = product_title;
    product.product_price = product_price;
    product.product_discount_price = product_discount_price;
    product.product_start_at = product_start_at;
    product.product_end_at = product_end_at;
    product.product_stock = product_stock;
    product.product_use_yn = ProductStatus.Y;
    product.product_extra_pridce = product_extra_price;
    product.store = store;

    try {
      await product.save();
      delete product.store;
    } catch (error) {
      console.log(error);
    }
    return product;
  }
  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    const { useYn } = filterDto;
    const query = this.createQueryBuilder('product');

    if (useYn) {
      query.where('product_use_yn = :useYn', { useYn });
    }

    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
