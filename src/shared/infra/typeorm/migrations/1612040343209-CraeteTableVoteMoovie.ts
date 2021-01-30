import {MigrationInterface, QueryRunner} from "typeorm";

export class CraeteTableVoteMoovie1612040343209 implements MigrationInterface {
    name = 'CraeteTableVoteMoovie1612040343209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote_movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rate" integer NOT NULL, CONSTRAINT "PK_ed9333bfb9a59d5a0e4da683b2c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vote_movies"`);
    }

}
