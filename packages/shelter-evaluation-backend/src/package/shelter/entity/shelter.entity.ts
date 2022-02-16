import { AutoMap } from '@automapper/classes';
import { ProvinceEntity } from '../../user';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shelter' })
export class ShelterEntity { 

  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  owner: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
  })
  @AutoMap()
  coordinate: string;

  @OneToOne(() => ProvinceEntity, province => province.id, { eager: true })
  @JoinColumn({name: 'province_id'})
  @AutoMap({ typeFn: () => ProvinceEntity })
  province: ProvinceEntity;

  @Column('boolean', {default: false})
  @AutoMap()
  validate: boolean;
}