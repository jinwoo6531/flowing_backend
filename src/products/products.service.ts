import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Store } from 'src/entities/store.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { GetProductFilterDto } from './dto/product-filter.dto';
import { ProductStatus } from './product.enum';
import { ProductRepository } from './product.repository';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(
    productCreateDto: ProductCreateDto,
    store: Store,
  ): Promise<Product> {
    return await this.productRepository.createProduct(productCreateDto, store);
  }

  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    return await this.productRepository.getProducts(filterDto);
  }

  async getProductById(id: number) {
    const found = await this.productRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return found;
  }

  async updateProductStatus(id: number, status: ProductStatus) {
    const product = await this.getProductById(id);

    product.product_use_yn = status;
    await product.save();
    return product;
  }

  //이미지 업로드
  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }

        return res.status(201).json(req.files.map((item) => item.location));
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 2);
}
