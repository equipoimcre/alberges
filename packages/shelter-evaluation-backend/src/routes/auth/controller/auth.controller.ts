import { Controller, Post, UseGuards, Request, Get, Query, HttpCode, HttpException, HttpStatus, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiProperty,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from 'shelter-evaluation-dto';
import { Public } from 'src/decorator/public.decorator';
import { JwtAuthGuard } from '../../../guard';
import { AuthService } from '../service';

class AccessToken {
  @ApiProperty()
  accessToken: string;
}
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiBody({ type: LoginDto })
  loging(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Post('reset-password')
  async resetPassword(@Body() body: { password: string }, @Request() request ) {
    await this.authService.resetPassword(body.password, request.user);
  }

  @Public()
  @HttpCode(204)
  @Post('reset-password-communication')
  async resetPasswordCommunication(@Query('email') email: string ) {
    try {
      await this.authService.resetPasssowrdCommunitcation(email);
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('basic')
  @ApiResponse({
    type: AccessToken,
  })
  @Get('validate')
  getProfile(@Request() req) {
    return req.user;
  }
}
