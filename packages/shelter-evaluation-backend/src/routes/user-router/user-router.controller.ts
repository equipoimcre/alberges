import { Controller, Get, Param, UseGuards, Request, Post, Body, Delete, Query, Put, Patch } from '@nestjs/common';
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
  async get(@Query('id') id: number) {
    const user = await this.userService.findById(id);
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

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() UserDto: UserDto) {
    return this.userService.updateUser(UserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/password')
  async changePassword(@Param('id') id: number, @Body() body: {password: string}) {
    return this.userService.changePassword(id, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

}
