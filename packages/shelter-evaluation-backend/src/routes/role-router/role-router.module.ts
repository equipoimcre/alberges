import { Module } from '@nestjs/common';
import { RoleModule } from '../../package';
import { RoleRouterController } from './role-router.controller';

@Module({
  imports: [
    RoleModule,
  ],
  controllers: [RoleRouterController]
})
export class RoleRouterModule {}
