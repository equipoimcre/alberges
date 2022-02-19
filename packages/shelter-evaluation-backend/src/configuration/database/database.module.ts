import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseConfigurationService,
  ConfigurationModule,
} from '../environment';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [DatabaseConfigurationService],
      useFactory: (config: DatabaseConfigurationService) =>
        config.typeOrmConfiguration,
    }),
  ],
})
export class DatabaseModule {}
