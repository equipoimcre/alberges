import { Body, Controller, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ROLE, ShelterDto } from 'shelter-evaluation-dto';
import { Roles } from 'src/decorator/role.decorator';
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
  @Roles(ROLE.ADMINISTRATOR, ROLE.LOCALIZATOR)
  create(@Body() shelterDto: ShelterDto) {
    return this.shelterService.insert(shelterDto);
  }


  @Roles(ROLE.ADMINISTRATOR, ROLE.EVALUATOR, ROLE.VALIDATOR)
  @Get()
  findWithFilter(@Query('take') take: number, @Query('skip') skip: number, @Query() query: any, @Request() req) {
    const filters = Object.assign({}, query)
    delete filters.take;
    delete filters.skip;
    return this.shelterService.filter(take, skip, filters, req.user.role);
  }

  @ApiCreatedResponse({
    type: ShelterDto,
  })
  @Roles(ROLE.ADMINISTRATOR, ROLE.EVALUATOR, ROLE.VALIDATOR)
  @Get(':id')
  getShelterById(@Param('id') id: number) {
    return this.shelterService.findById(id);
  }

  @ApiCreatedResponse({
    type: ShelterDto,
  })
  @Roles(ROLE.ADMINISTRATOR, ROLE.VALIDATOR)
  @Patch('validate/:id')
  pathShelter(@Param('id') id: number, @Body() body: {validate: boolean}) {
    return this.shelterService.validate(id, body)
  }

}
