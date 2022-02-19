import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UserPositionDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty()
  public id: number;
  @AutoMap()
  @IsString()
  @ApiProperty()
  public name: string;
}