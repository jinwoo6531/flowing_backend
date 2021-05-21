import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { StoreRepository } from './store.repository';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([StoreRepository]),
  ],
  controllers: [StoresController],
  providers: [StoresService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class StoresModule {}
