import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE, ShelterDto, UserDto, UserRoleDto } from 'shelter-evaluation-dto';
import { mapper } from '../../../utils';
import { Connection, Repository, FindConditions, Like } from 'typeorm';
import { ShelterEntity } from '../entity';

@Injectable()
export class ShelterService {

  constructor(
    @InjectRepository(ShelterEntity)
    private shelterRepository: Repository<ShelterEntity>,
    private connection: Connection,
  ) {}

  findById(id: number) {
    return this.shelterRepository.findOne(id, { relations: ['community', 'province'] });
  }

  validate(id: number, body: {validate: boolean}) {
    return this.shelterRepository.update(id, body);
  }

  async insert(shelterDto: ShelterDto) {
    const shelterEntity = mapper.map(shelterDto, ShelterEntity, ShelterDto);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const storedShelterEntity = await queryRunner.manager.save(shelterEntity);
      for (let shelterResponse of shelterEntity.shelterResponseList) {
        shelterResponse.shelterId = storedShelterEntity.id;
        await queryRunner.manager.save(shelterResponse);
      }
      await queryRunner.commitTransaction();
      return storedShelterEntity;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }finally {
      await queryRunner.release();
    }
  }

  async filter(take: number, skip: number, filters: any, user: UserDto) {
    const where: FindConditions<ShelterEntity> = {};

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (user.role.name === ROLE.ADMINISTRATOR) {
      if (filters.communityId) {
        where.community = {
          id: filters.communityId,
        }
      }
  
      if (filters.provinceId) {
        where.province = {
          id: filters.provinceId,
        }
      }
    } else {
      where.province = {
        id: user.province.id,
      }
    }

    if (user.role.name !== ROLE.ADMINISTRATOR) {
      where.validate = user.role.name === ROLE.VALIDATOR ? false : true;
    }

    const [data, count] = await this.shelterRepository.findAndCount({
      take: take || 10,
      skip: skip || 0,
      relations: ['community', 'province'],
      where,
    });
    return {
      data,
      count,
    };
  }
}
