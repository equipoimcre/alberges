import { Module } from '@nestjs/common';
import { ShelterModule } from '../../package/shelter/shelter.module';
import { ShelterController } from './controller/shelter.controller';

@Module({
  imports: [ShelterModule],
  controllers: [ShelterController]
})
export class ShelterRouterModule {}
