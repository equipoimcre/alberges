import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guard';
import { UserOrganizationService, UserPositionService, UserProvinceService, UserRoleService } from '../../package';

@Controller()
@ApiSecurity('basic')
export class UserOtherController {

  constructor(
    private userRoleService: UserRoleService,
    private userOrganizationService: UserOrganizationService,
    private userProvinceService: UserProvinceService,
    private userPositionService: UserPositionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('role/all')
  getAllRole() {
    return this.userRoleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('position/all')
  getAllPosition() {
    return this.userPositionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('province/all')
  getAllProvince() {
    return this.userProvinceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('organization/all')
  getAllOrganization() {
    return this.userOrganizationService.findAll();
  }

}
