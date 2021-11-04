import { Module } from '@nestjs/common';
import { UserModule } from '../../package';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service';
import { LocalStrategy, JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'test', // TODO: Change to dynamic secret
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
