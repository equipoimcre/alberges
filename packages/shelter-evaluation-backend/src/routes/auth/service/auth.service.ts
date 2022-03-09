import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { UserEntity, UserService } from '../../../package';
import { UserDto } from 'shelter-evaluation-dto';
import { Encrypt, mapper } from '../../../utils';
import { JwtService } from '@nestjs/jwt';
import { SmtpConfigurationService } from '../../../configuration';

@Injectable()
export class AuthService {
  private encrypt: Encrypt;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private smtpConfigurationService: SmtpConfigurationService,
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
    const payload = { ...user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async resetPassword(password: string, userDto: UserDto) {
    await this.userService.changePassword(userDto.id, password);
  }

  async resetPasssowrdCommunitcation(email: string) {
    const user = await this.userService.findByEmail(email);
    if(!user) {
      throw new Error('Use does not exists')
    }
    const token = this.jwtService.sign({id: user.id}, { expiresIn: "15m" })
    const mailer = createTransport({
      host: this.smtpConfigurationService.host,
      port: this.smtpConfigurationService.port,
    });
    await mailer.sendMail({
      from: this.smtpConfigurationService.noReplay,
      to: email,
      subject: 'Reset password',
      text: `https://${process.env.GATEWAY_HOST}/password/reset/${token}`,
    });
  }
}
