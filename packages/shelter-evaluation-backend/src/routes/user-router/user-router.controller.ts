import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Delete,
  Query,
  Put,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from 'shelter-evaluation-dto';
import { mapper } from '../../utils';
import { UserEntity, UserService } from '../../package';
import { JwtAuthGuard } from '../../guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiProperty,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../decorator/role.decorator';
import { ROLE } from '../../configuration/role';

class Password {
  @ApiProperty()
  password: string;
}

@Controller('user')
@ApiSecurity('basic')
@ApiTags('user')
export class UserRouterController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @Get()
  async getAll(@Query('take') take: number, @Query('skip') skip: number, @Query() params: any) {
    const result = await this.userService.getAll(take, skip, params);
    return {
      ...result,
      data: mapper.mapArray(result.data, UserDto, UserEntity),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @Get(':id')
  @ApiCreatedResponse({
    type: UserDto,
  })
  async get(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    return mapper.map(user, UserDto, UserEntity) as UserDto;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @Post()
  @ApiCreatedResponse({
    type: UserDto,
  })
  async create(@Body() userDto: CreateUserDto) {
    const user = await this.userService.createUser(userDto);
    return mapper.map(user, UserDto, UserEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @HttpCode(204)
  @Put()
  async updateUser(@Body() UserDto: UserDto) {
    await this.userService.updateUser(UserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @HttpCode(204)
  @ApiBody({ type: Password })
  @Patch(':id/password')
  async changePassword(
    @Param('id') id: number,
    @Body() body: { password: string },
  ) {
    await this.userService.changePassword(id, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLE.ADMINISTRATOR)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
