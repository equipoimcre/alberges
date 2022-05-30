import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Geometry } from 'geojson';
import { CommunityDto, ProvinceDto } from "../other";
import { ShelterResponseDto } from "./shelter-response.dto";

export class ShelterDto {
  @ApiProperty()
  @AutoMap()
  id: number | undefined;
  @ApiProperty()
  @IsString()
  @AutoMap()
  name: string;
  @ApiProperty()
  @IsString()
  @AutoMap()
  owner: string;
  @ApiProperty()
  coordinate: Geometry;
  @ApiProperty()
  @AutoMap()
  municipality: string;
  @ApiProperty()
  @AutoMap({typeFn: () => CommunityDto})
  community: CommunityDto;
  @ApiProperty()
  @AutoMap({typeFn: () => ProvinceDto})
  province: ProvinceDto;
  @ApiProperty()
  @IsBoolean()
  @AutoMap()
  validate: boolean;
  @ApiProperty()
  @AutoMap()
  note: string | undefined;
  @ApiProperty()
  @AutoMap({typeFn: () => ShelterResponseDto})
  shelterResponseList: ShelterResponseDto[];  
  @ApiProperty()
  @IsNumber()
  surface: number;
  @ApiProperty()
  @IsNumber()
  exteriorSurface: number;
  @ApiProperty()
  @IsNumber()
  bathroomSurface: number;
  @ApiProperty()
  @IsNumber()
  showerQuantity: number;
  @ApiProperty()
  @IsNumber()
  sinkQuantity: number;
  @ApiProperty()
  @IsNumber()
  toiletQuantity: number;
  @ApiProperty()
  @IsNumber()
  washingMachineQuantity: number;
}