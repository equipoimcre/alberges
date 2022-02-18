import { AutoMap } from "@automapper/classes";
import { IsNumber, IsString } from "class-validator";
import { ProvinceDto } from "./province.dto";

export class CommunityDto {
  @AutoMap()
  @IsNumber()
  public id: number;
  @AutoMap()
  @IsString()
  public name: string;
  @AutoMap({ typeFn: () => ProvinceDto })
  public provinceList: ProvinceDto[];
}