import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './configuration/database/database.module';
import { JwtAuthGuard, RolesGuard } from './guard';
import { UserModule } from './package';
import { AuthModule, UserRouterModule } from './routes';
import { ShelterModule } from './package/shelter/shelter.module';
import { QuestionModule } from './package/question/question.module';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    UserRouterModule,
    ShelterModule,
    QuestionModule,
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
