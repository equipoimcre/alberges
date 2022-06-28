import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ShelterResponseDto {
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  questionId: number;
  @ApiProperty()
  @IsNumber()
  @AutoMap()
  shelterId: number | undefined;
  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  response: boolean;
  @AutoMap()
  @ApiProperty()
  note?: string;
}