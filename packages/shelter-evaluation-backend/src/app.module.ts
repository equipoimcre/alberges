import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './configuration/database/database.module';
import { JwtAuthGuard, RolesGuard } from './guard';
import { AuthModule, QuestionRouterModule, UserRouterModule } from './routes';
import { ShelterRouterModule } from './routes/shelter-router/shelter-router.module';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserRouterModule,
    QuestionRouterModule,
    ShelterRouterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
