import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProvinceEntity } from './province.entity';

@Entity({ name: 'community' })
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => ProvinceEntity, (province) => province.community, {
    eager: true,
  })
  @AutoMap({ typeFn: () => ProvinceEntity, depth: 1 })
  public provinceList: ProvinceEntity[];
}
