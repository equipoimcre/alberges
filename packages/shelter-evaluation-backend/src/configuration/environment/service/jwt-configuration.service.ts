import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigurationService {
  constructor(private configService: ConfigService) {}

  get secretKey() {
    return this.configService.get<string>('AUTH_SECRET_KEY');
  }

  get expireIn() {
    return this.configService.get<string>('AUTH_EXPIRE_IN');
  }
}
