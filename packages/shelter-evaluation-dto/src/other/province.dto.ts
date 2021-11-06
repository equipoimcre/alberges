import { AutoMap } from "@automapper/classes";
import { IsNumber, IsString } from "class-validator";

export class ProvinceDto {
  @AutoMap()
  @IsNumber()
  public id: number;
  @AutoMap()
  @IsString()
  public name: string;
}