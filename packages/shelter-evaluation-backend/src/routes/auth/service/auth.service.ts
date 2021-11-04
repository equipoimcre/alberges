import { Injectable } from '@nestjs/common';
import { UserEntity, UserService } from '../../../package';
import { LoginDto, UserDto } from 'shelter-evaluation-dto';
import { mapper } from 'src/utils';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const userEntity = await this.userService.findByEmail(username);
    if (userEntity && userEntity.isActive && userEntity.password === password) {
      return mapper.map(userEntity, UserDto, UserEntity);
    }
    return null;
  }

}
