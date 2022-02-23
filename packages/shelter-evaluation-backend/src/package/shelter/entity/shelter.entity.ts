import { AutoMap } from '@automapper/classes';
import { CommunityEntity, ProvinceEntity } from '../../user';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Geometry } from 'geojson';
import { ShelterResponseEntity } from './shelter-response.entity';
import { GeometryTransformer } from '../transformer/geometry-transformer';

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
    srid: 4326,
    transformer: new GeometryTransformer(),
  })
  coordinate: Geometry;

  @OneToOne(() => CommunityEntity, (community) => community.id)
  @JoinColumn({ name: 'community_id' })
  community: CommunityEntity;

  @OneToOne(() => ProvinceEntity, (province) => province.id)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;

  @Column()
  @AutoMap()
  municipality: string;

  @Column('boolean', { default: false })
  @AutoMap()
  validate: boolean;

  @Column()
  @AutoMap()
  note: string;

  @OneToMany(
    () => ShelterResponseEntity,
    shelterResponse => shelterResponse.shelter,
    {eager: true}
  )
  @AutoMap({typeFn: () => ShelterResponseEntity})
  shelterResponseList: ShelterResponseEntity[];
}
