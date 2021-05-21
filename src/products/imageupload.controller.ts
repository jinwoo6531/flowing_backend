import { ProductsService } from './products.service';
import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('imageupload')
export class ImageuploadController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.productService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
