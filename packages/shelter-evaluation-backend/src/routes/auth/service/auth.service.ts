import { Injectable } from '@nestjs/common';
import { UserEntity, UserService } from '../../../package';
import { UserDto } from 'shelter-evaluation-dto';
import { Encrypt, mapper } from '../../../utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private encrypt: Encrypt;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.encrypt = new Encrypt();
  }

  async validateUser(username: string, password: string) {
    const userEntity = await this.userService.findByEmail(username);

    const isValid = await this.encrypt.compare(password, userEntity.password);
    if (userEntity && userEntity.isActive && isValid) {
      return mapper.map(userEntity, UserDto, UserEntity);
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
