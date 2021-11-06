import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends BaseUserDto {
  @AutoMap()
  @IsNotEmpty()
  password: string;
}