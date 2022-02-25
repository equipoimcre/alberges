import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserDto } from 'shelter-evaluation-dto';
import { Encrypt, mapper } from '../../../utils';
import { FindConditions, Like, Repository } from 'typeorm';
import { UserEntity } from '../entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findById(id: number) {
    return this.usersRepository.findOne({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  createUser(userDto: CreateUserDto) {
    const userEntity = mapper.map(userDto, UserEntity, CreateUserDto);
    return this.usersRepository.save(userEntity);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }

  updateUser(userDto: UserDto) {
    return this.usersRepository.update(userDto.id, userDto);
  }

  changePassword(id: number, password: string) {
    const encrypt = new Encrypt();
    return this.usersRepository.update(id, {
      password: encrypt.hash(password),
    });
  }

  async getAll(take: number, skip: number, filters: any) {
    const where: FindConditions<UserEntity> = {};

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.surname) {
      where.surname = Like(`%${filters.surname}%`);
    }

    if (filters.email) {
      where.email = Like(`%${filters.email}%`);
    }

    const [data, count] = await this.usersRepository.findAndCount({
      take: take || 10,
      skip: skip || 0,
      where,
    });
    return {
      data,
      count,
    };
  }
}
