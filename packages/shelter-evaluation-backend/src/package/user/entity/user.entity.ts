import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { ProvinceEntity } from './province.entity';
import { UserPositionEntity } from './user.positions.entity';
import { UserRoleEntity } from './user.role';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  agreeTerm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(type => ProvinceEntity, province => province.id)
  @JoinColumn()
  province: ProvinceEntity;

  @OneToOne(type => OrganizationEntity, organization => organization.id)
  @JoinColumn()
  organization: OrganizationEntity;

  @OneToOne(type => UserRoleEntity, role => role.id)
  @JoinColumn()
  role: UserRoleEntity;

  @OneToOne(type => UserPositionEntity, position => position.id)
  @JoinColumn()
  position: UserPositionEntity;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}