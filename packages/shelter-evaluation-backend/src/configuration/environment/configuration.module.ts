import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  DatabaseConfigurationService,
  JwtConfigurationService,
  SmtpConfigurationService,
} from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  providers: [DatabaseConfigurationService, JwtConfigurationService, SmtpConfigurationService],
  exports: [
    ConfigModule,
    DatabaseConfigurationService,
    JwtConfigurationService,
    SmtpConfigurationService,
  ],
})
export class ConfigurationModule {}
