import { createMapper, ignore, mapFrom, mapWith } from '@automapper/core';
import { classes } from '@automapper/classes';
import {
  CommunityDto,
  CreateUserDto,
  OrganizationDto,
  ProvinceDto,
  QuestionDto,
  UserDto,
  UserPositionDto,
  UserRoleDto,
  ShelterDto,
  ShelterResponseDto
} from 'shelter-evaluation-dto';
import { ProvinceEntity } from '../package/user/entity/province.entity';
import { UserPositionEntity } from '../package/user/entity/user.positions.entity';
import { OrganizationEntity } from '../package/user/entity/organization.entity';
import { UserEntity } from '../package/user/entity/user.entity';
import { Encrypt } from './encrypt';
import { CommunityEntity } from '../package/user/entity/community.entity';
import { QuestionEntity } from '../package/question/entity/question.entity';
import { ShelterEntity } from '../package/shelter/entity/shelter.entity';
import { ShelterResponseEntity } from '../package/shelter/entity/shelter-response.entity';
import { RoleEntity } from '../package/role/entity/role.entity';

export const mapper = createMapper({
  name: 'userEntityToUserDto',
  pluginInitializer: classes,
});

mapper.createMap(ProvinceDto, ProvinceEntity)
mapper.createMap(UserRoleDto, RoleEntity);
mapper.createMap(UserPositionDto, UserPositionEntity);
mapper.createMap(OrganizationDto, OrganizationEntity);
mapper.createMap(UserDto, UserEntity);
mapper.createMap(CommunityDto, CommunityEntity);
mapper.createMap(ShelterResponseDto, ShelterResponseEntity)
mapper.createMap(QuestionDto, QuestionEntity);
mapper.createMap(ShelterDto, ShelterEntity).forMember(
    d => d.community,
    mapWith(CommunityDto, CommunityEntity, s => s.community),
  )
  .forMember(
    d => d.province,
    mapWith(ProvinceDto, ProvinceEntity, s => s.province)
  )
  .forMember(
    d => d.coordinate,
    mapFrom(s => s.coordinate)
  );

mapper.createMap(ProvinceEntity, ProvinceDto)
mapper.createMap(RoleEntity, UserRoleDto);
mapper.createMap(UserPositionEntity, UserPositionDto);
mapper.createMap(OrganizationEntity, OrganizationDto);
mapper.createMap(UserEntity, UserDto);
mapper.createMap(CommunityEntity, CommunityDto);
mapper.createMap(ShelterResponseEntity, ShelterResponseDto)
mapper.createMap(QuestionEntity, QuestionDto);
mapper.createMap(ShelterEntity, ShelterDto).forMember(
  d => d.community,
  mapWith(CommunityEntity, CommunityDto, s => s.community),
)
.forMember(
  d => d.province,
  mapWith(ProvinceEntity, ProvinceDto, s => s.province)
)
.forMember(
  d => d.coordinate,
  mapFrom(s => s.coordinate)
);

mapper.createMap(CreateUserDto, UserEntity).forMember(
  (destionation) => destionation.password,
  mapFrom((source) => {
    const encrypt = new Encrypt();
    return encrypt.hash(source.password);
  }),
);
