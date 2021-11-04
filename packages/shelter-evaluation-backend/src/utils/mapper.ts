import { createMapper } from "@automapper/core";
import { classes } from '@automapper/classes';
import { OrganizationDto, ProvinceDto, UserDto, UserPositionDto, UserRoleDto } from "shelter-evaluation-dto";
import { OrganizationEntity, ProvinceEntity, UserEntity, UserPositionEntity, UserRoleEntity } from "../package";

export const mapper = createMapper({
  name: 'userEntityToUserDto',
  pluginInitializer: classes,
});

mapper.createMap(ProvinceEntity, ProvinceDto);
mapper.createMap(UserRoleEntity, UserRoleDto);
mapper.createMap(UserPositionEntity, UserPositionDto);
mapper.createMap(OrganizationEntity, OrganizationDto);
mapper.createMap(UserEntity, UserDto);