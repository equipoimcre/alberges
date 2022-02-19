import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class UserDto extends BaseUserDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty()
  public id: number;
}