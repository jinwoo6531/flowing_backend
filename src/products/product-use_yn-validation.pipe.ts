import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductStatus } from './product.enum';

export class ProductUseYNValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ProductStatus.Y, ProductStatus.N];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
