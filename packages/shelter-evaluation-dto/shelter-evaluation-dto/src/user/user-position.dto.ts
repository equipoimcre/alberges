import { AutoMap } from "@automapper/classes";

export class UserPositionDto {
  @AutoMap()
  public id: number;
  @AutoMap()
  public name: string;
}