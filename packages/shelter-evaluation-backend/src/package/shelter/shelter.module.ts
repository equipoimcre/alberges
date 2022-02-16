import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity, ShelterResponseEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShelterEntity,
      ShelterResponseEntity,
    ]),
  ]
})
export class ShelterModule {}
