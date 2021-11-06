import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigurationService, JwtConfigurationService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  providers: [
    DatabaseConfigurationService,
    JwtConfigurationService,
  ],
  exports: [
    ConfigModule,
    DatabaseConfigurationService,
    JwtConfigurationService,
  ],
})
export class ConfigurationModule {}
