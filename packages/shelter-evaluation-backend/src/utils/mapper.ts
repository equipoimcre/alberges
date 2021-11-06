import { createMapper } from "@automapper/core";
import { classes } from '@automapper/classes';
import { CreateUserDto, OrganizationDto, ProvinceDto, UserDto, UserPositionDto, UserRoleDto } from "shelter-evaluation-dto";
import { ProvinceEntity } from "../package/user/entity/province.entity";
import { UserRoleEntity } from "../package/user/entity/user.role.entity";
import { UserPositionEntity } from "../package/user/entity/user.positions.entity";
import { OrganizationEntity } from "../package/user/entity/organization.entity";
import { UserEntity } from "../package/user/entity/user.entity";

export const mapper = createMapper({
  name: 'userEntityToUserDto',
  pluginInitializer: classes,
});

mapper.createMap(ProvinceEntity, ProvinceDto);
mapper.createMap(UserRoleEntity, UserRoleDto);
mapper.createMap(UserPositionEntity, UserPositionDto);
mapper.createMap(OrganizationEntity, OrganizationDto);
mapper.createMap(UserEntity, UserDto);

mapper.createMap(ProvinceDto, ProvinceEntity);
mapper.createMap(UserRoleDto, UserRoleEntity);
mapper.createMap(UserPositionDto, UserPositionEntity);
mapper.createMap(OrganizationDto, OrganizationEntity);
mapper.createMap(UserDto, UserEntity);

mapper.createMap(CreateUserDto, UserEntity);