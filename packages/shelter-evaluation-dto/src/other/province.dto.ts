import { AutoMap } from "@automapper/classes";

export class ProvinceDto {
  @AutoMap()
  public id: number;
  @AutoMap()
  public name: string;
}