import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from 'shelter-evaluation-dto';
import { JwtAuthGuard } from '../../guard';
import { RoleService, RoleEntity } from '../../package';
import { mapper } from '../../utils';

@Controller('role')
@ApiTags('Role')
export class RoleRouterController {

  constructor(private roleService: RoleService,) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiCreatedResponse({
    type: [UserRoleDto],
  })
  async getAllRole() {
    const roleList = await this.roleService.findAll();
    return mapper.mapArray(roleList, UserRoleDto, RoleEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  @ApiCreatedResponse({
    type: [UserRoleDto],
  })
  async getCurrentRole(@Request() req) {
    return req.user.role;
  }
}
