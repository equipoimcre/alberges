import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity, ShelterResponseEntity } from './entity';
import { ShelterService } from './service/shelter.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShelterEntity, ShelterResponseEntity])],
  providers: [ShelterService],
  exports: [ShelterService],
})
export class ShelterModule {}
