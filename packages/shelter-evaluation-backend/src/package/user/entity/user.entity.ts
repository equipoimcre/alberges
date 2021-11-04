import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { ProvinceEntity } from './province.entity';
import { UserPositionEntity } from './user.positions.entity';
import { UserRoleEntity } from './user.role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  surname: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'agree_term' })
  agreeTerm: boolean;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToOne(type => ProvinceEntity, province => province.id)
  @JoinColumn()
  @AutoMap()
  province: ProvinceEntity;

  @OneToOne(type => OrganizationEntity, organization => organization.id)
  @JoinColumn()
  @AutoMap()
  organization: OrganizationEntity;

  @OneToOne(type => UserRoleEntity, role => role.id)
  @JoinColumn()
  @AutoMap()
  role: UserRoleEntity;

  @OneToOne(type => UserPositionEntity, position => position.id)
  @JoinColumn()
  @AutoMap()
  position: UserPositionEntity;

  @CreateDateColumn({name: 'create_date'})
  createDate: Date;

  @UpdateDateColumn({name: 'udpate_date'})
  updateDate: Date;
}