import { AutoMap } from "@automapper/classes";
import { OrganizationDto, ProvinceDto } from "../other";
import { UserPositionDto } from "./user-position.dto";
import { UserRoleDto } from "./user-role.dto";

export class UserDto {
  @AutoMap()
  public id: string;
  @AutoMap()
  public email: string;
  @AutoMap()
  public name: string;
  @AutoMap()
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