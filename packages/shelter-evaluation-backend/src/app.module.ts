import { Module } from '@nestjs/common';
import { DatabaseModule } from './configuration/database/database.module';
import { UserModule } from './package';
import { AuthModule } from './routes';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
  ]
})
export class AppModule {}
