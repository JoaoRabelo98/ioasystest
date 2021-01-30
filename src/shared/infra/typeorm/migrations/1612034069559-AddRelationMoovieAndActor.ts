import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationMoovieAndActor1612034069559 implements MigrationInterface {
    name = 'AddRelationMoovieAndActor1612034069559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "moovies_actors_actors" ("mooviesId" uuid NOT NULL, "actorsId" uuid NOT NULL, CONSTRAINT "PK_533dc6ce9fe7f0e528212e2ca53" PRIMARY KEY ("mooviesId", "actorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8dc83b833b605c126511411995" ON "moovies_actors_actors" ("mooviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c3563e2800ad0f0be8d77b9b3c" ON "moovies_actors_actors" ("actorsId") `);
        await queryRunner.query(`ALTER TABLE "moovies_actors_actors" ADD CONSTRAINT "FK_8dc83b833b605c126511411995a" FOREIGN KEY ("mooviesId") REFERENCES "moovies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "moovies_actors_actors" ADD CONSTRAINT "FK_c3563e2800ad0f0be8d77b9b3c8" FOREIGN KEY ("actorsId") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moovies_actors_actors" DROP CONSTRAINT "FK_c3563e2800ad0f0be8d77b9b3c8"`);
        await queryRunner.query(`ALTER TABLE "moovies_actors_actors" DROP CONSTRAINT "FK_8dc83b833b605c126511411995a"`);
        await queryRunner.query(`DROP INDEX "IDX_c3563e2800ad0f0be8d77b9b3c"`);
        await queryRunner.query(`DROP INDEX "IDX_8dc83b833b605c126511411995"`);
        await queryRunner.query(`DROP TABLE "moovies_actors_actors"`);
    }

}
