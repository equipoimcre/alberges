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
  @AutoMap()
  public province: ProvinceDto;
  @AutoMap()
  public role: UserRoleDto;
  @AutoMap()
  public userPosition: UserPositionDto;
  @AutoMap()
  public organization: OrganizationDto;
}