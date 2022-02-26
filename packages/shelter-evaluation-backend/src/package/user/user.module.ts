import { Module } from '@nestjs/common';
import {
  UserService,
  UserPositionService,
  UserOrganizationService,
  UserProvinceService,
  CommunityService,
} from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommunityEntity,
  OrganizationEntity,
  ProvinceEntity,
  UserEntity,
  UserPositionEntity,
} from './entity';
import { RoleModule } from '../role';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPositionEntity,
      ProvinceEntity,
      OrganizationEntity,
      CommunityEntity,
    ]),
    RoleModule,
  ],
  providers: [
    UserService,
    UserPositionService,
    UserOrganizationService,
    UserProvinceService,
    CommunityService,
  ],
  exports: [
    UserService,
    UserPositionService,
    UserOrganizationService,
    UserProvinceService,
    CommunityService,
  ],
})
export class UserModule {}
