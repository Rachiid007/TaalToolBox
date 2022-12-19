import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
//import { CardsService } from '../src/cards/cards.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('get all cards /cards (GET)', async () => {
    const listCards =
      '[{"id":1,"word":"électricité","translation":"elektriciteit","image":"img"},{"id":2,"word":"tension","translation":"spanning","image":"img"},{"id":3,"word":"électrique","translation":"elektrisch","image":"img"},{"id":4,"word":"câble","translation":"kabel","image":"img"},{"id":5,"word":"ampoule","translation":"ampul","image":"img"},{"id":6,"word":"compteur électrique","translation":"elektriciteits meter","image":"img"},{"id":7,"word":"court circuit","translation":"kortsluiting","image":"img"},{"id":8,"word":"prise électrique","translation":"stopcontact","image":"img"},{"id":9,"word":"disjoncteur","translation":"stroomonderbreker","image":"img"},{"id":10,"word":"fusible","translation":"zekering","image":"img"}]';
    return request(app.getHttpServer())
      .get('/cards')
      .expect(200)
      .expect(listCards);
  });

  it('GET card id 10', async () => {
    const result = {
      id: 10,
      word: 'fusible',
      translation: 'zekering',
      image: 'img',
    };
    return request(app.getHttpServer())
      .get('/cards/10')
      .expect(200)
      .expect(result);
  });

  it('Add a new card (POST)', async () => {
    const result = {
      word: 'électricité2',
      translation: 'elektriciteit2',
      image: 'nom féminin',
    };

    return request(app.getHttpServer())
      .post('/cards')
      .set('Accept', 'application/json')
      .send(result)
      .expect(201);
  });

  it('get cards as per the weight (Get)', async () => {
    return request(app.getHttpServer()).get('/cards/1/10').expect(200);
  });

  it('Add user Response with only 1 entry (Post)', async () => {
    const user_response = {
      id_card: 1,
      id_answer: 1,
    };
    return request(app.getHttpServer())
      .post('/user-response/1/cards')
      .set('Accept', 'application/json')
      .send(user_response)
      .expect(201);
  });

  it('Add user Response with 2entries (Post)', async () => {
    const user_response = [
      {
        id_card: 1,
        id_answer: 1,
      },
      {
        id_card: 5,
        id_answer: 2,
      },
    ];
    return request(app.getHttpServer())
      .post('/user-response/1/cards')
      .set('Accept', 'application/json')
      .send(user_response)
      .expect(201);
  });

  it('Add user Response does not exist in the DB (Post)', async () => {
    const user_response = [
      {
        id_card: 1,
        id_answer: 1,
      },
      {
        id_card: 5,
        id_answer: 2,
      },
    i];
    return request(app.getHttpServer())
      .post('/user-response/9/cards')
      .set('Accept', 'application/json')
      .send(user_response)
      .expect(201);
  });

  it('user stats Endpoint test (Get)', async () => {
    return request(app.getHttpServer()).get('/user-response/userStats/1').expect(200);
  });
  it('school stats Endpoint test (Get) (Get)', async () => {
    return request(app.getHttpServer()).get('/user-response/schoolClassStats/1').expect(200);
  });
  it('subscription stats Endpoint test (Get) (Get)', async () => {
    return request(app.getHttpServer()).get('users/subscription_stats/1').expect(200);
  });
  it('Active players stats Endpoint test (Get) (Get)', async () => {
    return request(app.getHttpServer()).get('/users/activePlayers/1').expect(200);
  });
});
