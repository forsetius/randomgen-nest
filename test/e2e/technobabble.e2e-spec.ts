import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { TechnobabbleModule } from '../../src/technobabble/TechnobabbleModule';

describe('TechnobabbleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TechnobabbleModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/technobabble (GET)', () => supertest(app.getHttpServer())
    .get('/technobabble')
    .expect(200)
    .expect(/^[\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+$/u));

  it('/startrek/technobabble (GET)', () => supertest(app.getHttpServer())
    .get('/startrek/technobabble')
    .expect(200)
    .expect(/^[\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+$/u));

  it('/technobabble?lang=pl (GET)', () => supertest(app.getHttpServer())
    .get('/technobabble?lang=pl')
    .expect(200)
    .expect(/^[\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+$/u));

  it('/startrek/technobabble?lang=pl (GET)', () => supertest(app.getHttpServer())
    .get('/startrek/technobabble?lang=pl')
    .expect(200)
    .expect(/^[\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+$/u));

  it('/technobabble?lang=en (GET)', () => supertest(app.getHttpServer())
    .get('/technobabble?lang=en')
    .expect(200)
    .expect(/^[\w-]+ [\w-]+ [\w-]+ [\w-]+ [\w-]+$/u));

  it('/startrek/technobabble?lang=en (GET)', () => supertest(app.getHttpServer())
    .get('/startrek/technobabble?lang=en')
    .expect(200)
    .expect(/^[\w-]+ [\w-]+ [\w-]+ [\w-]+ [\w-]+$/u));
});
