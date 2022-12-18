import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsers1671318631877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users(id , name, surname, firstName, lastName,  email, shoolEmail, privateEmail, password, birthdate,phone, sex) values(1,'admin','taaltoolbox','admin','taaltoolbox', 'admin@gmail.com', 'admin@shool.com','admin@gmail.com', 'Taaltoolbox2022', '01-01-2022', 0666777888);`,
    );

    await queryRunner.query(`INSERT INTO users_role_role VALUES(1 , 1)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users_role_role WHERE id=1`);
    await queryRunner.query(`DELETE FROM users WHERE id=1`);
  }
}
