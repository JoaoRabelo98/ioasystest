import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableMoovie1612033970397 implements MigrationInterface {
    name = 'CreateTableMoovie1612033970397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "moovies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "director" character varying NOT NULL, "genre" character varying NOT NULL, CONSTRAINT "PK_b62c10605d98afb1e2350ae9948" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "moovies"`);
    }

}
