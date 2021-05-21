import { IsString } from 'class-validator';

export class StoreCredentialsDto {
  @IsString()
  store_name: string;

  @IsString()
  store_password: string;
}
