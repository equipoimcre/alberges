import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrganizationDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @IsString()
  @ApiProperty()
  public name: string;
}
