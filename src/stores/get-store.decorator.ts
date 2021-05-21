import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';

export const GetStore = createParamDecorator(
  (data, ctx: ExecutionContext): Store => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
