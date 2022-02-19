import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { ProvinceDto } from "./province.dto";

export class CommunityDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @IsString()
  @ApiProperty()
  public name: string;
  @AutoMap({ typeFn: () => ProvinceDto })
  @ApiProperty({ type: () => ProvinceDto })
  public provinceList: ProvinceDto[];
}