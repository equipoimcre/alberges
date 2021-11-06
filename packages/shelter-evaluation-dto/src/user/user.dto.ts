import { AutoMap } from "@automapper/classes";
import { BaseUserDto } from "./base-user.dto";

export class UserDto extends BaseUserDto {
  @AutoMap()
  public id: string;
}