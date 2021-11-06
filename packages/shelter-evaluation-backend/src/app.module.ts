import { Module } from '@nestjs/common';
import { DatabaseModule } from './configuration/database/database.module';
import { UserModule } from './package';
import { AuthModule } from './routes';
import { UserRouterModule } from './routes/user-router/user-router.module';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    UserRouterModule,
  ]
})
export class AppModule {}
