import { Controller, Get } from '@nestjs/common';
import { UserOrganizationService, UserProvinceService, UserRoleService } from '../../package';

@Controller('user')
export class UserOtherController {

  constructor(
    private userRoleService: UserRoleService,
    private userOrganizationService: UserOrganizationService,
    private userProvinceService: UserProvinceService,
    private userPositionService: UserProvinceService,
  ) {}

  @Get('role/all')
  getAllRole() {
    return this.userRoleService.findAll();
  }

  @Get('position/all')
  getAllPosition() {
    return this.userPositionService.findAll();
  }

  @Get('province/all')
  getAllProvince() {
    return this.userProvinceService.findAll();
  }

  @Get('organization/all')
  getAllOrganization() {
    return this.userOrganizationService.findAll();
  }

}
