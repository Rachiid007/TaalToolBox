import { AppModule } from './../app.module';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { CardsModule } from './cards.module';
import { INestApplication } from '@nestjs/common';

describe('Cards', () => {
  let app: INestApplication;
  const cardsService = {
    findAll: () => {
      return {
        id: 1,
        word: 'chien',
        translation: 'dog',
        image:
          'http://localhost:3000/public/images/cards/chien.svg1668020154575.svg',
      };
    },
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CardsModule],
    })
      .overrideProvider(cardsService)
      .useValue(cardsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cards`, async () => {
    const response = await request(app.getHttpServer()).get('/cards');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(5);
    expect(response.body).toContainEqual(cardsService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
