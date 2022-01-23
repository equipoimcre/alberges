import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserDto } from 'shelter-evaluation-dto';
import { mapper } from '../../../utils';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findById(id: number) {
    return this.usersRepository.findOne({id});
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({email});
  }

  createUser(userDto: CreateUserDto) {
    const userEntity = mapper.map(userDto, UserEntity, CreateUserDto);
    return this.usersRepository.insert(userEntity);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
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
