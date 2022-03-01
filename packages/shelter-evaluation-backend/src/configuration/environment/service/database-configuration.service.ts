import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  UserEntity,
  UserPositionEntity,
  ShelterEntity,
  ProvinceEntity,
  OrganizationEntity,
  QuestionEntity,
  ShelterResponseEntity,
  CommunityEntity,
  RoleEntity,
} from '../../../package';

@Injectable()
export class DatabaseConfigurationService {
  constructor(private configService: ConfigService) {}

  get user() {
    return this.configService.get<string>('DATABASE_USER');
  }

  get host() {
    return this.configService.get<string>('DATABSE_HOST');
  }

  get password() {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get collection() {
    return this.configService.get<string>('DATABASE_COLLECTION');
  }

  get port() {
    return this.configService.get<number>('DATABASE_PORT', { infer: true });
  }

  get syncrhonize() {
    return (
      this.configService.get<string>('DATABASE_SYNCRHONIZE', 'false') === 'true'
    );
  }

  get typeOrmConfiguration(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.host,
      port: this.port,
      username: this.user,
      password: this.password,
      database: this.collection,
      logging: true,
      entities: [
        UserEntity,
        UserPositionEntity,
        RoleEntity,
        ProvinceEntity,
        OrganizationEntity,
        ShelterEntity,
        QuestionEntity,
        ShelterResponseEntity,
        CommunityEntity,
      ],
      synchronize: this.syncrhonize,
    };
  }
}
