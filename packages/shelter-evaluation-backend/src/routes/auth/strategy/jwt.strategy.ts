import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfigurationService } from '../../../configuration';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(jwtConfigurationService: JwtConfigurationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigurationService.secretKey,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.username,
      role: payload.role.name,
    };
  }
}
