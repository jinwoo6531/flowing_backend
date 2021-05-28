import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreCredentialsDto } from './dto/credentials.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private storeService: StoresService) {}

  @Post('/createStore')
  createStore(
    @Body(ValidationPipe) createStoreDto: CreateStoreDto,
  ): Promise<void> {
    return this.storeService.createStore(createStoreDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) storeCredentialsDto: StoreCredentialsDto,
  ): Promise<{ accessToken: string; store_name: string }> {
    return this.storeService.signIn(storeCredentialsDto);
  }
}
