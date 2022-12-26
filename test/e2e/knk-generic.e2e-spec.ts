import type { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest, { Response } from 'supertest';
import { AppModule } from '../../src/app/AppModule';

function getErrorMessage(response: Response): string {
  return response.error
    ? (JSON.parse(response.error.text) as { message: string }).message
    : '';
}

describe('KnkController (e2e) - Generic', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/knk/city (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/city');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/city?lang=pl (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/city?lang=pl');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/city?lang=en (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/city?lang=en');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/dungeon (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/dungeon');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/dungeon?lang=pl (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/dungeon?lang=pl');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/dungeon?lang=en (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/dungeon?lang=en');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('/knk/dungeon?numberOfFactions=2 (GET)', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/knk/dungeon?numberOfFactions=2');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });
});
