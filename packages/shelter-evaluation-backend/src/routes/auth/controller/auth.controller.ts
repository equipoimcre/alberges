import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'shelter-evaluation-dto';
import { Public } from 'src/decorator/public.decorator';
import { JwtAuthGuard } from '../../../guard';
import { AuthService } from '../service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @ApiBody({type: LoginDto})
  async loging(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  getProfile(@Request() req) {
    return req.user;
  }

}
