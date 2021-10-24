import { Module } from '@nestjs/common';
import { DatabaseModule } from './configuration/database/database.module';
import { UserModule } from './package';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
  ]
})
export class AppModule {}
