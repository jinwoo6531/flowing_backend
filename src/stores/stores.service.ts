import { JwtPayload } from './jwt-payload.interface';
import { CreateStoreDto } from './dto/create-store.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';
import { StoreCredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreRepository)
    private storeRepository: StoreRepository,
    private jwtService: JwtService,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<void> {
    return this.storeRepository.createStore(createStoreDto);
  }

  async signIn(
    storeCredentialsDto: StoreCredentialsDto,
  ): Promise<{ accessToken: string; store_name: string }> {
    const store_name = await this.storeRepository.validateUserPassword(
      storeCredentialsDto,
    );

    if (!store_name) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { store_name };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, store_name };
  }
}
