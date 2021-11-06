import { Controller, Get, Param, UseGuards, Request, Post, Body } from '@nestjs/common';
import { CreateUserDto, UserDto } from 'shelter-evaluation-dto';
import { mapper } from '../../utils';
import { UserEntity, UserService } from '../../package';
import { JwtAuthGuard } from '../../guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiSecurity('basic')
@ApiTags('user')
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
      data: mapper.mapArray(result.data, UserDto, UserEntity),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

}
