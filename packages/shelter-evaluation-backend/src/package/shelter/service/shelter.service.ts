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
    this.caculationCacAndAp(shelterEntity);
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

  private caculationCacAndAp(shelterEntity: ShelterEntity) {
    // CAC
    shelterEntity.cacSurface = Math.ceil(shelterEntity.surface / 35);
    shelterEntity.showerQuantityCac = Math.round(shelterEntity.cacSurface / 50);
    const showerSomethingCac = Math.abs(shelterEntity.showerQuantityCac - shelterEntity.showerQuantity) * 2
    shelterEntity.potableShowerSpaceQuantityCac = shelterEntity.showerQuantity <= shelterEntity.showerQuantityCac && showerSomethingCac <= shelterEntity.exteriorSurface ? showerSomethingCac : 0;
    const h21 = shelterEntity.exteriorSurface - shelterEntity.potableShowerSpaceQuantityCac;
    shelterEntity.toiletQuantityCac = Math.round(shelterEntity.cacSurface / 20);
    const tolietSomethingCac = Math.abs(shelterEntity.toiletQuantityCac - shelterEntity.toiletQuantity) * 2
    shelterEntity.howManySurfaceForToiletCac = shelterEntity.toiletQuantity <= shelterEntity.toiletQuantityCac && tolietSomethingCac <= h21 ? tolietSomethingCac : 0;
    shelterEntity.sufarceWahsingMachineCac = Math.round(100 / shelterEntity.cacSurface);
    const howManyWashingMachineCanInstallSomethingCac = Math.abs( shelterEntity.sufarceWahsingMachineCac - shelterEntity.washingMachineQuantity)
    shelterEntity.howManyWashingMachineCanInstallCac = shelterEntity.washingMachineQuantity <=  shelterEntity.sufarceWahsingMachineCac && howManyWashingMachineCanInstallSomethingCac <= h21 ? howManyWashingMachineCanInstallSomethingCac : 0;
    const h28 = h21 - shelterEntity.howManyWashingMachineCanInstallCac;
    shelterEntity.thereAreTolietFor20PersonCac = Math.round(shelterEntity.cacSurface / 20);
    const howManySpaceWashingMachineSomethingCac = Math.abs(shelterEntity.thereAreTolietFor20PersonCac - shelterEntity.washingMachineQuantity) * 1.5;
    shelterEntity.potableWashingMachineSurfaceCac = shelterEntity.washingMachineQuantity <= shelterEntity.thereAreTolietFor20PersonCac && howManySpaceWashingMachineSomethingCac <= h28 ? howManySpaceWashingMachineSomethingCac : 0;
    // AP
    shelterEntity.apSurface = Math.ceil(shelterEntity.surface / 45);
    shelterEntity.showerQuantitysAp = Math.round(shelterEntity.apSurface / 50);
    const showerSomethingAp = Math.abs(shelterEntity.showerQuantitysAp - shelterEntity.showerQuantity) * 2
    shelterEntity.portableShowerSpaceQuantityAp = shelterEntity.showerQuantity <= showerSomethingAp && showerSomethingAp <= shelterEntity.exteriorSurface ? showerSomethingAp : 0;
    const i21 = shelterEntity.exteriorSurface - shelterEntity.portableShowerSpaceQuantityAp;
    shelterEntity.toiletQuantityAp = Math.round(shelterEntity.apSurface / 20);
    const tolietSomethingAp = Math.abs(shelterEntity.toiletQuantityAp - shelterEntity.toiletQuantity) * 2
    shelterEntity.howManySurfaceForToiletsAp = shelterEntity.toiletQuantity <= shelterEntity.toiletQuantityAp && tolietSomethingAp <= i21 ? tolietSomethingAp : 0;
    shelterEntity.sufarceWahsingMachineAp = Math.round(100 / shelterEntity.apSurface);
    const howManyWashingMachineCanInstallSomethinAp = Math.abs( shelterEntity.sufarceWahsingMachineAp - shelterEntity.washingMachineQuantity)
    shelterEntity.howManyWashingMachineCanInstallAp = shelterEntity.washingMachineQuantity <=  shelterEntity.sufarceWahsingMachineAp && howManyWashingMachineCanInstallSomethinAp <= h21 ? howManyWashingMachineCanInstallSomethinAp : 0;
    const i28 = i21 - shelterEntity.howManyWashingMachineCanInstallAp;
    shelterEntity.thereAreTolietFor20PersonAp = Math.round(shelterEntity.apSurface / 20);
    const howManySpaceWashingMachineSomethingAp = Math.abs(shelterEntity.thereAreTolietFor20PersonAp - shelterEntity.washingMachineQuantity )* 1.5 ;
    shelterEntity.potableWashingMachineSurfaceAP = shelterEntity.washingMachineQuantity <= howManySpaceWashingMachineSomethingAp && howManySpaceWashingMachineSomethingAp <= i28 ? howManySpaceWashingMachineSomethingAp : 0;
  }
}
