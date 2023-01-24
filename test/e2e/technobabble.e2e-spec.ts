import type { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { TechnobabbleModule } from '../../src/technobabble/TechnobabbleModule';

const regexpPl = /^[\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+ [\p{L}-]+$/u;
const regexpEn = /^[\w-]+ [\w-]+ [\w-]+ [\w-]+ [\w-]+$/u;

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
    .expect(regexpPl));

  it('/api/1.0/startrek/technobabble (GET)', () => supertest(app.getHttpServer())
    .get('/api/1.0/startrek/technobabble')
    .expect(200)
    .expect(regexpPl));

  it('/technobabble?lang=pl (GET)', () => supertest(app.getHttpServer())
    .get('/technobabble?lang=pl')
    .expect(200)
    .expect(regexpPl));

  it('/api/1.0/startrek/technobabble?lang=pl (GET)', () => supertest(app.getHttpServer())
    .get('/api/1.0/startrek/technobabble?lang=pl')
    .expect(200)
    .expect(regexpPl));

  it('/technobabble?lang=en (GET)', () => supertest(app.getHttpServer())
    .get('/technobabble?lang=en')
    .expect(200)
    .expect(regexpEn));

  it('/api/1.0/startrek/technobabble?lang=en (GET)', () => supertest(app.getHttpServer())
    .get('/api/1.0/startrek/technobabble?lang=en')
    .expect(200)
    .expect(regexpEn));
});
