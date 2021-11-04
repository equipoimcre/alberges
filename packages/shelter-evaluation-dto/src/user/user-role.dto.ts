import { AutoMap } from "@automapper/classes";

export class UserRoleDto {
  @AutoMap()
  public id: number;
  @AutoMap()
  public name: string;
}