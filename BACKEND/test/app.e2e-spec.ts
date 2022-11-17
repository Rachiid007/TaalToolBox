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

  it('get all cards /cards (GET)', () => {
    const listCards =
      '[{"id":11,"word":"électricité","translation":"elektriciteit","image":"nom féminin"},{"id":12,"word":"tension","translation":"spanning","image":"nom féminin"},{"id":13,"word":"électrique","translation":"elektrisch","image":"nom féminin"},{"id":4,"word":"câble","translation":"kabel","image":"nom masculin"},{"id":5,"word":"ampoule","translation":"ampul","image":"nom féminin"},{"id":6,"word":"compteur électrique","translation":"elektriciteits meter","image":"nom masculin"},{"id":7,"word":"court circuit","translation":"kortsluiting","image":"nom masculin"},{"id":8,"word":"prise électrique","translation":"stopcontact","image":"nom féminin"},{"id":9,"word":"disjoncteur","translation":"stroomonderbreker","image":"nom masculin"},{"id":10,"word":"fusible","translation":"zekering","image":"nom féminin"},{"id":1,"word":"commutateur","translation":"schakelaar","image":"img"},{"id":2,"word":"condensateur","translation":"condensator","image":"img"},{"id":3,"word":"conductivité ","translation":"geleidbaarheid","image":"img"}]';
    return request(app.getHttpServer())
      .get('/cards')
      .expect(200)
      .expect(listCards);
  });

  it('GET card id 11', async () => {
    const result = {
      id: 11,
      word: 'électricité',
      translation: 'elektriciteit',
      image: 'nom féminin',
    };
    return request(app.getHttpServer())
      .get('/cards/11')
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

  it('get random cards (Get)', async () => {
    const result = {
      word: 'électricité2',
      translation: 'elektriciteit2',
      image: 'nom féminin',
    };

    return request(app.getHttpServer()).get('/cards/1/10').expect(200);
  });
});