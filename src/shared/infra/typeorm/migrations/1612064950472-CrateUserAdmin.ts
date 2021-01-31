import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CrateUserAdmin1612064950472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.users (id,"name","password",email,created_at,updated_at,active,"isAdmin") VALUES ('03ca53d5-0c8c-4487-af55-82e5955f19d6','admin','$2a$08$lTFDnV58sjA3jDOEn2eMw.qPRoXSoeIlRQQTYa6EK2dmMggGLybMi','admin@mail.com','2021-01-30 23:05:43.088358','2021-01-30 23:05:43.088358',true,true);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from users where id = '03ca53d5-0c8c-4487-af55-82e5955f19d6'`,
    );
  }
}
