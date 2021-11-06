import { AutoMap } from "@automapper/classes";
import { IsNumber } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class UserDto extends BaseUserDto {
  @AutoMap()
  @IsNumber()
  public id: number;
}