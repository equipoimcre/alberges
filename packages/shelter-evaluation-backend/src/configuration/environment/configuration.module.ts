import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigurationService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  providers: [
    DatabaseConfigurationService,
  ],
  exports: [
    ConfigModule,
    DatabaseConfigurationService
  ],
})
export class ConfigurationModule {}
