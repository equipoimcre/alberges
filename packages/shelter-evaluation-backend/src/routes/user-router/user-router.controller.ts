import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserDto } from 'shelter-evaluation-dto';
import { mapper } from '../../utils';
import { UserEntity, UserService } from '../../package';
import { JwtAuthGuard } from '../../guard';

@Controller('user')
export class UserRouterController {

  constructor(
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(@Request() req) {
    const user = await this.userService.findByEmail(req.user.email);
    return mapper.map(user, UserDto, UserEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@Param('take') take: number, @Param('skip') skip: number) {
    const result = await this.userService.getAll(take, skip);
    return {
      ...result,
      data: result.data.map( element => mapper.map(element, UserDto, UserEntity)),
    };
  }

}
