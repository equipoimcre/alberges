import { Module } from '@nestjs/common';
import { UserService } from './service';
import { UserController } from './controller/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity, ProvinceEntity, UserEntity, UserPositionEntity, UserRoleEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPositionEntity,
      UserRoleEntity,
      ProvinceEntity,
      OrganizationEntity
    ])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
  ]
})
export class UserModule {}
