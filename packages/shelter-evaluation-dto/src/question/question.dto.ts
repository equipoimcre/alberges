import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class QuestionDto {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  id: number;
  @AutoMap()
  @ApiProperty()
  @IsString()
  question: string;
}