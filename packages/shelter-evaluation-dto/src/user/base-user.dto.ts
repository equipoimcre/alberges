import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { OrganizationDto, ProvinceDto } from '../other';
import { UserPositionDto } from './user-position.dto';
import { UserRoleDto } from './user-role.dto';

export class BaseUserDto {
  @AutoMap()
  @IsEmail()
  @ApiProperty()
  public email: string;
  @AutoMap()
  @ApiProperty()
  @IsString()
  public name: string;
  @AutoMap()
  @ApiProperty()
  @IsString()
  public surname: string;
  @ApiProperty()
  @AutoMap({ typeFn: () => ProvinceDto })
  public province: ProvinceDto;
  @ApiProperty()
  @AutoMap({ typeFn: () => UserRoleDto })
  public role: UserRoleDto;
  @ApiProperty()
  @AutoMap({ typeFn: () => UserPositionDto })
  public position: UserPositionDto;
  @ApiProperty()
  @AutoMap({ typeFn: () => OrganizationDto })
  public organization: OrganizationDto;
  @AutoMap()
  readonly isActive: boolean;
}
