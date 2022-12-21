import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTable1671661758365 implements MigrationInterface {
  name = 'UpdateTable1671661758365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "src" character varying NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "weight" integer NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "level_difficulty" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_45e7c8ccd805f3f88e2e1e8a269" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cards_theme" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_83a1f52898aeb0b3b9e3d461694" UNIQUE ("name"), CONSTRAINT "PK_221b001bab7b26853a645e8f643" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "word" character varying NOT NULL, "translation" character varying NOT NULL, "image" character varying, "difficultyId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "learn_domain" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b838aafa0f0cac4d8fba1ce1b64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "school" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schoolclass" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "schoolId" integer NOT NULL, CONSTRAINT "PK_b9bb5188ebf8964dd6d2536a950" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "schoolEmail" character varying NOT NULL, "password" character varying NOT NULL, "birthdate" character varying NOT NULL, "sex" character varying NOT NULL, "score" integer, "langId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lang" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_1c6b76e1e18ad677569858be1c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "level_map" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "address" character varying NOT NULL, "position" double precision array NOT NULL, "activityId" integer NOT NULL, "difficultyId" integer NOT NULL, "themeId" integer NOT NULL, CONSTRAINT "PK_c6461cdfac114ef098a1587d455" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "drag_and_drop" ("id" SERIAL NOT NULL, "levelData" character varying NOT NULL, "image" character varying, "levelMapId" integer NOT NULL, CONSTRAINT "REL_35b842b05eaacb95425989a61b" UNIQUE ("levelMapId"), CONSTRAINT "PK_da2902e03c38a256d2a35a93dd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "proficiency" ("proficiencyId" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "weight" integer NOT NULL, CONSTRAINT "PK_2609fc7036851fcdb00d9f68bb5" PRIMARY KEY ("proficiencyId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_response" ("id" SERIAL NOT NULL, "dateResponse" TIMESTAMP NOT NULL, "userId" integer NOT NULL, "cardId" integer NOT NULL, "answerId" integer NOT NULL, "levelMapId" integer NOT NULL, "proficiencyId" integer NOT NULL, CONSTRAINT "PK_d0b43c100886629ee9cc360f056" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_cardstheme_cards_theme" ("cardId" integer NOT NULL, "cardsThemeId" integer NOT NULL, CONSTRAINT "PK_5de20adcf07ae9b490961311b56" PRIMARY KEY ("cardId", "cardsThemeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bcafe782bf363166347191961f" ON "card_cardstheme_cards_theme" ("cardId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5916daa05e446d5d94571b8000" ON "card_cardstheme_cards_theme" ("cardsThemeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_role_role" ("usersId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_91bf4bea7343f831656d9c4d86b" PRIMARY KEY ("usersId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ff128b442b9528e2929095f70" ON "users_role_role" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c73c87afeed286059b0c4c4bb1" ON "users_role_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_schoolclass_schoolclass" ("usersId" integer NOT NULL, "schoolclassId" integer NOT NULL, CONSTRAINT "PK_af11a95c2c1e2e1cb3d15009ede" PRIMARY KEY ("usersId", "schoolclassId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4cae1bfd6a34380aa059d5de5d" ON "users_schoolclass_schoolclass" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af3ff04d68b4454d6cc452073f" ON "users_schoolclass_schoolclass" ("schoolclassId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_edde72fe0cdcae92da305d5307e" FOREIGN KEY ("difficultyId") REFERENCES "level_difficulty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schoolclass" ADD CONSTRAINT "FK_c201f5a7a604eea105355a781b2" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_507b3ab1380afa28ba85335913c" FOREIGN KEY ("langId") REFERENCES "lang"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" ADD CONSTRAINT "FK_b2029270f77c473e138e43d80c4" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" ADD CONSTRAINT "FK_af4bca827afeafd82eee0d3edea" FOREIGN KEY ("difficultyId") REFERENCES "level_difficulty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" ADD CONSTRAINT "FK_7362c892dc488bcb2f28448789d" FOREIGN KEY ("themeId") REFERENCES "cards_theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "drag_and_drop" ADD CONSTRAINT "FK_35b842b05eaacb95425989a61b0" FOREIGN KEY ("levelMapId") REFERENCES "level_map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" ADD CONSTRAINT "FK_285c16e9a00e07b9cc713804b49" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" ADD CONSTRAINT "FK_b008c87cd40150556d1e1461bdf" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" ADD CONSTRAINT "FK_23fe2c153b2b2a2a997a936698b" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" ADD CONSTRAINT "FK_f6b08ffc18b3d414d5142fdda2e" FOREIGN KEY ("levelMapId") REFERENCES "level_map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_cardstheme_cards_theme" ADD CONSTRAINT "FK_bcafe782bf363166347191961f1" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_cardstheme_cards_theme" ADD CONSTRAINT "FK_5916daa05e446d5d94571b80007" FOREIGN KEY ("cardsThemeId") REFERENCES "cards_theme"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_role_role" ADD CONSTRAINT "FK_5ff128b442b9528e2929095f703" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_role_role" ADD CONSTRAINT "FK_c73c87afeed286059b0c4c4bb16" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_schoolclass_schoolclass" ADD CONSTRAINT "FK_4cae1bfd6a34380aa059d5de5d5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_schoolclass_schoolclass" ADD CONSTRAINT "FK_af3ff04d68b4454d6cc452073f9" FOREIGN KEY ("schoolclassId") REFERENCES "schoolclass"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_schoolclass_schoolclass" DROP CONSTRAINT "FK_af3ff04d68b4454d6cc452073f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_schoolclass_schoolclass" DROP CONSTRAINT "FK_4cae1bfd6a34380aa059d5de5d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_role_role" DROP CONSTRAINT "FK_c73c87afeed286059b0c4c4bb16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_role_role" DROP CONSTRAINT "FK_5ff128b442b9528e2929095f703"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_cardstheme_cards_theme" DROP CONSTRAINT "FK_5916daa05e446d5d94571b80007"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_cardstheme_cards_theme" DROP CONSTRAINT "FK_bcafe782bf363166347191961f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" DROP CONSTRAINT "FK_f6b08ffc18b3d414d5142fdda2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" DROP CONSTRAINT "FK_23fe2c153b2b2a2a997a936698b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" DROP CONSTRAINT "FK_b008c87cd40150556d1e1461bdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_response" DROP CONSTRAINT "FK_285c16e9a00e07b9cc713804b49"`,
    );
    await queryRunner.query(
      `ALTER TABLE "drag_and_drop" DROP CONSTRAINT "FK_35b842b05eaacb95425989a61b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" DROP CONSTRAINT "FK_7362c892dc488bcb2f28448789d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" DROP CONSTRAINT "FK_af4bca827afeafd82eee0d3edea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "level_map" DROP CONSTRAINT "FK_b2029270f77c473e138e43d80c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_507b3ab1380afa28ba85335913c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schoolclass" DROP CONSTRAINT "FK_c201f5a7a604eea105355a781b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_edde72fe0cdcae92da305d5307e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af3ff04d68b4454d6cc452073f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4cae1bfd6a34380aa059d5de5d"`,
    );
    await queryRunner.query(`DROP TABLE "users_schoolclass_schoolclass"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c73c87afeed286059b0c4c4bb1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ff128b442b9528e2929095f70"`,
    );
    await queryRunner.query(`DROP TABLE "users_role_role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5916daa05e446d5d94571b8000"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bcafe782bf363166347191961f"`,
    );
    await queryRunner.query(`DROP TABLE "card_cardstheme_cards_theme"`);
    await queryRunner.query(`DROP TABLE "reward"`);
    await queryRunner.query(`DROP TABLE "user_response"`);
    await queryRunner.query(`DROP TABLE "proficiency"`);
    await queryRunner.query(`DROP TABLE "drag_and_drop"`);
    await queryRunner.query(`DROP TABLE "level_map"`);
    await queryRunner.query(`DROP TABLE "lang"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "schoolclass"`);
    await queryRunner.query(`DROP TABLE "school"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "learn_domain"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "cards_theme"`);
    await queryRunner.query(`DROP TABLE "level_difficulty"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP TABLE "activity"`);
  }
}
