import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE, ShelterDto, UserRoleDto } from 'shelter-evaluation-dto';
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
      queryRunner.manager.save(shelterEntity);
      const storedShelterEntity = await this.shelterRepository.save(shelterEntity);
      for (let shelterResponse of shelterEntity.shelterResponseList) {
        shelterResponse.shelterId = storedShelterEntity.id;
        await queryRunner.manager.save(shelterResponse);
      }
      await queryRunner.commitTransaction();
      return storedShelterEntity;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    }finally {
      await queryRunner.release();
    }
  }

  async filter(take: number, skip: number, filters: any, role: UserRoleDto) {
    const where: FindConditions<ShelterEntity> = {};

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

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

    if (role.name !== ROLE.ADMINISTRATOR) {
      where.validate = role.name === ROLE.VALIDATOR ? false : true;
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
