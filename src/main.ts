import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

async function bootstrap() {
  Logger.debug('Creating nest app');
  const factoryOptions: NestApplicationOptions = {};
  if (process.env.SIMPLE_CONSOLE_LOGGER) {
    factoryOptions.logger = console;
  }
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    factoryOptions,
  );

  Logger.debug('Creating openapi docs');
  const options = new DocumentBuilder()
    .setTitle('Link Shortener API')
    .setDescription('The Link Shortener API')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat: 'jwt',
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  Logger.debug('Enable validation pipe');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 3000;
  Logger.log(`App will run on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
