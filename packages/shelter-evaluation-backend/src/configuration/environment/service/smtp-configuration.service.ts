import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmtpConfigurationService {
  constructor(private configService: ConfigService) {}

  get host() {
    return this.configService.get<string>('SMTP_HOST');
  }

  get port() {
    return this.configService.get<number>('SMTP_PORT');
  }

  get noReplay() {
    return this.configService.get<string>('EMAIL_NO_REPLAY');
  }
}
