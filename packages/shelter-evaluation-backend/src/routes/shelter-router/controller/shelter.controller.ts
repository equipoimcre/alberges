import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ShelterDto } from 'shelter-evaluation-dto';
import { ShelterService } from '../../../package/shelter/service/shelter.service';

@Controller('shelter')
@ApiSecurity('basic')
@ApiTags('shelter')
export class ShelterController {

  constructor(private shelterService: ShelterService) {}

  @ApiCreatedResponse({
    type: ShelterDto,
  })
  @Post()
  create(@Body() shelterDto: ShelterDto) {
    return this.shelterService.insert(shelterDto);
  }

  @ApiCreatedResponse({
    type: ShelterDto,
  })
  @Get(':id')
  getShelterById(@Param('id') id: number) {
    return this.shelterService.findById(id);
  }

  @ApiCreatedResponse({
    type: ShelterDto,
  })
  @Patch('validate/:id')
  pathShelter(@Param('id') id: number, @Body() body: {validate: boolean}) {
    return this.shelterService.validate(id, body)
  }
}
