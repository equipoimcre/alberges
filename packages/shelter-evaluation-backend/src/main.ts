import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Shelter evaluation API')
    .setDescription('Shelter evaluation API description')
    .setVersion('1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors({
    origin: [
      `http://${process.env.GATEWAY_HOST}`,
      `https://${process.env.GATEWAY_HOST}`
    ],
  });
  await app.listen(3000);
}
bootstrap();
