import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  CommunityDto,
  OrganizationDto,
  ProvinceDto,
  UserPositionDto,
} from 'shelter-evaluation-dto';
import { mapper } from '../../utils';
import { JwtAuthGuard } from '../../guard';
import {
  CommunityEntity,
  CommunityService,
  OrganizationEntity,
  ProvinceEntity,
  UserOrganizationService,
  UserPositionEntity,
  UserPositionService,
  UserProvinceService,
} from '../../package';

@Controller()
@ApiSecurity('basic')
@ApiTags('other')
export class UserOtherController {
  constructor(
    private userOrganizationService: UserOrganizationService,
    private userProvinceService: UserProvinceService,
    private userPositionService: UserPositionService,
    private communityService: CommunityService,
  ) {}

  

  @UseGuards(JwtAuthGuard)
  @Get('position/all')
  @ApiCreatedResponse({
    type: [UserPositionDto],
  })
  async getAllPosition() {
    const positionList = await this.userPositionService.findAll();
    return mapper.mapArray(positionList, UserPositionDto, UserPositionEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('province/all')
  @ApiCreatedResponse({
    type: [ProvinceDto],
  })
  async getAllProvince() {
    const provinceList = await this.userProvinceService.findAll();
    return mapper.mapArray(provinceList, ProvinceDto, ProvinceEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('organization/all')
  @ApiCreatedResponse({
    type: [OrganizationDto],
  })
  async getAllOrganization() {
    const organizationList = await this.userOrganizationService.findAll();
    return mapper.mapArray(
      organizationList,
      OrganizationDto,
      OrganizationEntity,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('community/all')
  @ApiCreatedResponse({
    type: [CommunityDto],
  })
  async getAllCommunity() {
    const communityList = await this.communityService.findAll();
    return mapper.mapArray(communityList, CommunityDto, CommunityEntity);
  }
}
