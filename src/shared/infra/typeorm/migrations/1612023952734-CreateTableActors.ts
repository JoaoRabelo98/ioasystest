import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableActors1612023952734 implements MigrationInterface {
    name = 'CreateTableActors1612023952734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "actors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_d8608598c2c4f907a78de2ae461" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actors"`);
    }

}
