import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { filter } from 'rxjs';
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

  @Get()
  findWithFilter(@Query('take') take: number, @Query('skip') skip: number, @Query() query: any) {
    const filters = Object.assign({}, query)
    delete filters.take;
    delete filters.skip;
    return this.shelterService.filter(take, skip, filters);
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
