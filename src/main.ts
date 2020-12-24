import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Link Shortener API')
    .setDescription('The Link Shortener API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('link-engine')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  Logger.log(`App will run on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
