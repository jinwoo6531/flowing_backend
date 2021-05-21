import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { StoresModule } from 'src/stores/stores.module';
import { ImageuploadController } from 'src/products/imageupload.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), StoresModule],
  providers: [ProductsService],
  controllers: [ProductsController, ImageuploadController],
})
export class ProductsModule {}
