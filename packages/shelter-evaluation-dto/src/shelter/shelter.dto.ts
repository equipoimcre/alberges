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
  @AutoMap()
  surface: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  exteriorSurface: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  bathroomSurface: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  showerQuantity: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  sinkQuantity: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  toiletQuantity: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  washingMachineQuantity: number;
  @AutoMap()
  cacSurface?: number;
  @AutoMap()
  showerQuantityCac?: number;
  @AutoMap()
  potableShowerSpaceQuantityCac?: number;
  @AutoMap()
  toiletQuantityCac?: number;
  @AutoMap()
  howManySurfaceForToiletCac?: number;
  @AutoMap()
  howManyWashingMachineCanInstallCac?: number;
  @AutoMap()
  thereAreTolietFor20PersonCac?: number;
  @AutoMap()
  potableWashingMachineSurfaceCac?: number;
  @AutoMap()
  apSurface?: number;
  @AutoMap()
  showerQuantitysAp?: number;
  @AutoMap()
  portableShowerSpaceQuantityAp?: number;
  @AutoMap()
  toiletQuantityAp?: number;
  @AutoMap()
  howManySurfaceForToiletsAp?: number;
  @AutoMap()
  howManyWashingMachineCanInstallAp?: number;
  @AutoMap()
  thereAreTolietFor20PersonAp?: number;
  @AutoMap()
  potableWashingMachineSurfaceAP?: number;
  @AutoMap()
  sufarceWahsingMachineAp?: number;
  @AutoMap()
  sufarceWahsingMachineCac?: number;
  @AutoMap()
  isCac?: boolean;
  @AutoMap()
  isAp?: boolean;

}