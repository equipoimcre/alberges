import { Injectable } from '@nestjs/common';
import { UserEntity, UserService } from '../../../package';
import { UserDto } from 'shelter-evaluation-dto';
import { mapper } from 'src/utils';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userEntity = await this.userService.findByEmail(username);
    if (userEntity && userEntity.isActive && userEntity.password === password) {
      return mapper.map(userEntity, UserDto, UserEntity);
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
