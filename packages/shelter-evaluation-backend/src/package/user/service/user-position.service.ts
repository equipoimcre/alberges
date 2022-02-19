import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPositionEntity } from '../entity';

@Injectable()
export class UserPositionService {
  constructor(
    @InjectRepository(UserPositionEntity)
    private userPositionRepository: Repository<UserPositionEntity>,
  ) {}

  findAll() {
    return this.userPositionRepository.find();
  }
}
