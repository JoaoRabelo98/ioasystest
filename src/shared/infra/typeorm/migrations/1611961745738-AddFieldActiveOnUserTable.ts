import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddFieldActiveOnUserTable1611961745738
  implements MigrationInterface {
  name = 'AddFieldActiveOnUserTable1611961745738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
  }
}
