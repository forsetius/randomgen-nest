import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
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
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: false,
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  it('GETs the "ep" template', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/1.0/ep/factions/general?lang=en&numberOfFactions=4');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it('GETs the "city" template', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/1.0/knk/city');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it.each([
    ['nosuch', 'No such template: "knk-nosuch-pl"'],
    [1, 'No such template: "knk-1-pl"'],
    [1.5, 'No such template: "knk-1.5-pl"'],
    ['true', 'No such template: "knk-true-pl"'],
  ])('Unable to GET the %p template', async (val, message) => {
    const response = await supertest(app.getHttpServer())
      .get(`/api/1.0/knk/${val}`);

    const body = JSON.parse(response.text) as { message: string };

    expect(response.status, getErrorMessage(response)).toBe(404);
    expect(body.message, getErrorMessage(response)).toContain(message);
  });

  it.each(['pl', 'en'])('GETs the "city" template in %p language', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/1.0/knk/city?lang=pl');

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it.each([
    ['n', 'lang must be longer than or equal to 2 characters'],
    ['nn', 'lang must be one of the following values: pl, en'],
    ['nnn', 'lang must be shorter than or equal to 2 characters'],
    [1, 'lang must be longer than or equal to 2 characters'],
    [1.5, 'lang must be shorter than or equal to 2 characters'],
  ])('Unable to GET the "city" template in %p language', async (val, message) => {
    const response = await supertest(app.getHttpServer())
      .get(`/api/1.0/knk/city?lang=${val}`);

    const body = JSON.parse(response.text) as { message: string };

    expect(response.status, getErrorMessage(response)).toBe(400);
    expect(body.message, getErrorMessage(response)).toContain(message);
  });

  it.each([2, 4, 8])('GETs %p factions', async (num) => {
    const response = await supertest(app.getHttpServer())
      .get(`/api/1.0/knk/city?lang=pl&numberOfFactions=${num}`);

    expect(response.status, getErrorMessage(response)).toBe(200);
  });

  it.each([
    [-2, 'numberOfFactions must not be less than 2'],
    [0, 'numberOfFactions must not be less than 2'],
    [1, 'numberOfFactions must not be less than 2'],
    [11, 'numberOfFactions must not be greater than 8'],
    [1.5, 'numberOfFactions must be an integer number'],
    ['true', 'numberOfFactions must be an integer number'],
  ])('Errors on GET %p factions', async (val, message) => {
    const response = await supertest(app.getHttpServer())
      .get(`/api/1.0/knk/city?lang=pl&numberOfFactions=${val}`);

    const body = JSON.parse(response.text) as { message: string };

    expect(response.status, getErrorMessage(response)).toBe(400);
    expect(body.message, getErrorMessage(response)).toContain(message);
  });
});
