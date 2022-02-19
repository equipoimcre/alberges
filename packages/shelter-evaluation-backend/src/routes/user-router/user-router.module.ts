import { Module } from '@nestjs/common';
import { UserModule } from '../../package';
import { UserRouterController } from './user-router.controller';
import { UserOtherController } from './user-other.controller';

@Module({
  imports: [UserModule],
  controllers: [UserRouterController, UserOtherController],
})
export class UserRouterModule {}
