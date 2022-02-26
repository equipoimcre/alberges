import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private userRoleRepository: Repository<RoleEntity>,
  ) {}

  findAll() {
    return this.userRoleRepository.find();
  }
}
