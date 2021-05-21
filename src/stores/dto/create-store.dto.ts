import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  store_name: string;

  @IsString()
  store_password: string;

  @IsNotEmpty()
  store_address: string;

  @IsNotEmpty()
  store_phone_number: string;

  @IsDecimal()
  store_longitude: string;

  @IsDecimal()
  store_latitude: string;

  @IsString()
  store_business_hour: string;

  @IsNotEmpty()
  store_grade: number;

  @IsString()
  store_image: string;

  @IsString()
  store_profile_image: string;

  @IsString()
  store_closed_day: string;
}
