import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationUserToVote1612040935985 implements MigrationInterface {
    name = 'AddRelationUserToVote1612040935985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_movies" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vote_movies" ADD CONSTRAINT "FK_0ff48cbb0d07fad7154e7107b15" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote_movies" DROP CONSTRAINT "FK_0ff48cbb0d07fad7154e7107b15"`);
        await queryRunner.query(`ALTER TABLE "vote_movies" DROP COLUMN "userId"`);
    }

}
