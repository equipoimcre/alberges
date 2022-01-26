import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPositionEntity } from '../entity';

@Injectable()
export class UserProvinceService {

  constructor(
    @InjectRepository(UserPositionEntity)
    private positionRepository: Repository<UserPositionEntity>,
  ) {}

  findAll() {
    return this.positionRepository.find();
  }

}
