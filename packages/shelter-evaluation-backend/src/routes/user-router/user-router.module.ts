import { Module } from '@nestjs/common';
import { UserModule } from '../../package';
import { UserRouterController } from './user-router.controller';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [UserRouterController],
})
export class UserRouterModule {}
