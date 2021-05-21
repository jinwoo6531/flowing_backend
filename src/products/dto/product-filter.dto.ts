import { IsIn } from 'class-validator';
import { ProductStatus } from '../product.enum';

export class GetProductFilterDto {
  @IsIn([ProductStatus.Y, ProductStatus.N])
  useYn: ProductStatus;
}
