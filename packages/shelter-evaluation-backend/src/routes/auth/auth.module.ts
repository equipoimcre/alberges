import { Module } from '@nestjs/common';
import { UserModule } from '../../package';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service';
import { LocalStrategy, JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import {
  ConfigurationModule,
  JwtConfigurationService,
} from '../../configuration';

@Module({
  imports: [
    UserModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [JwtConfigurationService],
      useFactory: (config: JwtConfigurationService) => ({
        secret: config.secretKey,
        signOptions: {
          expiresIn: config.expireIn,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
