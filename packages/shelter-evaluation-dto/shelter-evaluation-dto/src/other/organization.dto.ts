import { AutoMap } from "@automapper/classes";

export class OrganizationDto {
  @AutoMap()
  public id: number;
  @AutoMap()
  public name: number;
}