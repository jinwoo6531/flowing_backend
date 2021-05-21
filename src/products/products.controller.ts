import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from 'src/entities/product.entity';
import { Store } from 'src/entities/store.entity';
import { GetStore } from 'src/stores/get-store.decorator';
import { ProductCreateDto } from './dto/product-create.dto';
import { GetProductFilterDto } from './dto/product-filter.dto';
import { ProductUseYNValidationPipe } from './product-use_yn-validation.pipe';
import { ProductStatus } from './product.enum';
import { ProductsService } from './products.service';
import 'dotenv/config';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  createProduct(
    @Body() productCreateDto: ProductCreateDto,
    @GetStore() store: Store,
  ): Promise<Product> {
    console.log(productCreateDto);

    return this.productService.createProduct(productCreateDto, store);
  }

  //GET /products
  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    return this.productService.getProducts(filterDto);
  }

  @Get('/:product_id')
  getProductById(
    @Param('product_id', ParseIntPipe) product_id: number,
  ): Promise<Product> {
    return this.productService.getProductById(product_id);
  }

  //PATCH
  //Update USE_YN
  @Patch('/:product_id/use_yn')
  updateProductStatus(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body('use_yn', ProductUseYNValidationPipe) use_yn: ProductStatus,
  ): Promise<Product> {
    return this.productService.updateProductStatus(product_id, use_yn);
  }
}
