import { AutoMap } from "@automapper/classes";
import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends BaseUserDto {
  @AutoMap()
  password: string;
}