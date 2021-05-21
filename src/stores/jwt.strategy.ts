import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';
import { Store } from 'src/entities/store.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StoreRepository)
    private storeRepository: StoreRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<Store> {
    const { store_name } = payload;
    const user = await this.storeRepository.findOne({ store_name });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
