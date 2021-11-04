import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loging(@Request() req) {
    return req.user;
  }

}
