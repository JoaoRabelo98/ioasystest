import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationMoovieToVotes1612040752616 implements MigrationInterface {
    name = 'AddRelationMoovieToVotes1612040752616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_movies" ADD "moovieId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vote_movies" ADD CONSTRAINT "FK_97d77ef37727c461245e2ed04ba" FOREIGN KEY ("moovieId") REFERENCES "moovies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_movies" DROP CONSTRAINT "FK_97d77ef37727c461245e2ed04ba"`);
        await queryRunner.query(`ALTER TABLE "vote_movies" DROP COLUMN "moovieId"`);
    }

}
