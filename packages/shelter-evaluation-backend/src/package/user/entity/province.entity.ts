import { AutoMap } from '@automapper/classes';
import { Column, Entity,  JoinColumn,  ManyToOne, PrimaryColumn, } from 'typeorm';
import { CommunityEntity } from './community.entity';

@Entity({ name: 'province' })
export class ProvinceEntity { 

  @PrimaryColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;
  
  @ManyToOne(() => CommunityEntity, community => community.provinceList)
  @JoinColumn({name: 'community_id', referencedColumnName: 'id'})
  community: CommunityEntity;

}