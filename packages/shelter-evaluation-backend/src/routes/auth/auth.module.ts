import { Module } from '@nestjs/common';
import { UserModule } from '../../package';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service';
import { LocalStrategy } from './strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy,
  ],
})
export class AuthModule {}
