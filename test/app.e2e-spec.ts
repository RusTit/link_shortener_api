import * as fs from 'fs/promises';
import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jest.setTimeout(15000);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/payment-gateway/stripe/webhook (POST) checkout payload', async () => {
    const pathToPayload = path.resolve(
      __dirname,
      '..',
      'examples',
      'checkout.json',
    );
    const payloadCheckoutCompleted = await fs.readFile(pathToPayload, {
      encoding: 'utf-8',
    });
    const data = JSON.parse(payloadCheckoutCompleted);
    return request(app.getHttpServer())
      .post('/payment-gateway/stripe/webhook')
      .send(data)
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(() => {
    process.exit(0);
  });
});
