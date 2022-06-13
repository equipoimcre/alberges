import { AutoMap } from '@automapper/classes';
import { CommunityEntity, ProvinceEntity } from '../../user';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'udpate_date' })
  updateDate: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column()
  @AutoMap()
  surface: number;

  @Column({name: 'exterior_surface'})
  @AutoMap()
  exteriorSurface: number;

  @Column({name: 'bathroom_surface'})
  @AutoMap()
  bathroomSurface: number;

  @Column({name: 'shower_quantity'})
  @AutoMap()
  showerQuantity: number;

  @Column({name: 'sink_quantity'})
  @AutoMap()
  sinkQuantity: number;

  @Column({name: 'toilet_quantity'})
  @AutoMap()
  toiletQuantity: number;

  @Column({name: 'washing_machine_quantity'})
  @AutoMap()
  washingMachineQuantity: number;

  @Column({name: 'cac_surface'})
  @AutoMap()
  cacSurface: number;
 
  @Column({name: 'shower_quantity_cac'})
  @AutoMap()
  showerQuantityCac: number;

  @Column({name: 'portable_shower_space_quantity_cac'})
  @AutoMap()
  potableShowerSpaceQuantityCac: number;

  @Column({name: 'toilet_quantity_cac'})
  @AutoMap()
  toiletQuantityCac: number;

  @Column({name: 'how_many_surface_for_toilet_cac'})
  @AutoMap()
  howManySurfaceForToiletCac: number;
  
  @Column({name: 'surface_washing_machine_cac'})
  @AutoMap()
  sufarceWahsingMachineCac: number;

  @Column({name: 'how_many_wahsing_machine_can_install_cac'})
  @AutoMap()
  howManyWashingMachineCanInstallCac: number;

  @Column({name: 'there_are_toilet_for_20_person_cac'})
  @AutoMap()
  thereAreTolietFor20PersonCac: number;

  @Column({name: 'portable_washing_machine_surface_cac'})
  @AutoMap()
  potableWashingMachineSurfaceCac: number;

  @Column({name: 'ap_surface'})
  @AutoMap()
  apSurface: number;

  @Column({name: 'shower_quantity_ap'})
  @AutoMap()
  showerQuantitysAp: number;

  @Column({name: 'portable_shower_space_quantity_ap'})
  @AutoMap()
  portableShowerSpaceQuantityAp: number;

  @Column({name: 'toilet_quantity_ap'})
  @AutoMap()
  toiletQuantityAp: number;

  @Column({name: 'how_many_surface_for_toilet_ap'})
  @AutoMap()
  howManySurfaceForToiletsAp: number;

  @Column({name: 'surface_washing_machine_ap'})
  @AutoMap()
  sufarceWahsingMachineAp: number;

  @Column({name: 'how_many_wahsing_machine_can_install_ap'})
  @AutoMap()
  howManyWashingMachineCanInstallAp: number;

  @Column({name: 'there_are_toilet_for_20_person_ap'})
  @AutoMap()
  thereAreTolietFor20PersonAp: number;

  @Column({name: 'portable_washing_machine_surface_ap'})
  @AutoMap()
  potableWashingMachineSurfaceAP: number;
}
