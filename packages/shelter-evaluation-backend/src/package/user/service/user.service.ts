import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepository.findOne({email});
  }

  async getAll(take: number, skip: number) {
    const [data, count] = await this.usersRepository.findAndCount({
      take: take || 10,
      skip: skip || 0,
    });
    return {
      data,
      count,
    }
  }
}
