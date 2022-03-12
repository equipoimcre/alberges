import { AutoMap } from '@automapper/classes';
import { RoleEntity } from '../../role';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { ProvinceEntity } from './province.entity';
import { UserPositionEntity } from './user.positions.entity';

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
  @AutoMap()
  password: string;

  @Column({ name: 'agree_term' })
  agreeTerm: boolean;

  @Column({ default: true, name: 'is_active' })
  @AutoMap()
  isActive: boolean;

  @OneToOne(() => ProvinceEntity, (province) => province.id, { eager: true })
  @JoinColumn()
  @AutoMap({ typeFn: () => ProvinceEntity })
  province: ProvinceEntity;

  @OneToOne(() => OrganizationEntity, (organization) => organization.id, {
    eager: true,
  })
  @JoinColumn()
  @AutoMap({ typeFn: () => OrganizationEntity })
  organization: OrganizationEntity;

  @OneToOne(() => RoleEntity, (role) => role.id, { eager: true })
  @JoinColumn()
  @AutoMap({ typeFn: () => RoleEntity })
  role: RoleEntity;

  @OneToOne(() => UserPositionEntity, (position) => position.id, {
    eager: true,
  })
  @JoinColumn()
  @AutoMap({ typeFn: () => UserPositionEntity })
  position: UserPositionEntity;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'udpate_date' })
  updateDate: Date;
}
