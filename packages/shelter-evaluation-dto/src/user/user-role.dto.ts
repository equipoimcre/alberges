import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ROLE } from '../role';

export class UserRoleDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @IsString()
  @ApiProperty()
  public name: ROLE;
}
