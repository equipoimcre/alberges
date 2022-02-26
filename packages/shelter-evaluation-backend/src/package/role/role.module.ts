import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entity';
import {  RoleService} from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleEntity
    ])
  ],
  providers: [
    RoleService,
  ],
  exports: [
    RoleService,
  ]
})
export class RoleModule {}
