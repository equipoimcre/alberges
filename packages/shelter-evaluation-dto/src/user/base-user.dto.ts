import { AutoMap } from "@automapper/classes";
import { IsEmail, IsString } from "class-validator";
import { OrganizationDto, ProvinceDto } from "../other";
import { UserPositionDto } from "./user-position.dto";
import { UserRoleDto } from "./user-role.dto";

export class BaseUserDto {
  @AutoMap()
  @IsEmail()
  public email: string;
  @AutoMap()
  @IsString()
  public name: string;
  @AutoMap()
  @IsString()
  public surname: string;
  @AutoMap({ typeFn: () => ProvinceDto })
  public province: ProvinceDto;
  @AutoMap({ typeFn: () => UserRoleDto })
  public role: UserRoleDto;
  @AutoMap({ typeFn: () => UserPositionDto })
  public position: UserPositionDto;
  @AutoMap({ typeFn: () => OrganizationDto })
  public organization: OrganizationDto;
}