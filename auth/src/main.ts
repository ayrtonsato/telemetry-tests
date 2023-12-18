import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otelSDK } from './tracing';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(7000);
}
bootstrap();
