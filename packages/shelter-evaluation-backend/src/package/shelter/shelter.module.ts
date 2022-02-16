import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from './entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShelterEntity,
    ]),
  ]
})
export class ShelterModule {}
