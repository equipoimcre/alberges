import { Module } from '@nestjs/common';
import { UserService, UserRoleService, UserPositionService, UserOrganizationService, UserProvinceService, CommunityService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityEntity, OrganizationEntity, ProvinceEntity, UserEntity, UserPositionEntity, UserRoleEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserPositionEntity,
      UserRoleEntity,
      ProvinceEntity,
      OrganizationEntity,
      CommunityEntity,
    ])
  ],
  providers: [
    UserService, 
    UserRoleService, 
    UserPositionService, 
    UserOrganizationService, 
    UserProvinceService, 
    CommunityService,
  ],
  exports: [
    UserService, 
    UserRoleService, 
    UserPositionService, 
    UserOrganizationService, 
    UserProvinceService,
    CommunityService,
  ]
})
export class UserModule {}
