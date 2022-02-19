import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceEntity } from '../entity';

@Injectable()
export class UserProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private provinceRepository: Repository<ProvinceEntity>,
  ) {}

  findAll() {
    return this.provinceRepository.find();
  }
}
