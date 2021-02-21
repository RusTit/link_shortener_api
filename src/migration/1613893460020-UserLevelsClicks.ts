import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLevelsClicks1613893460020 implements MigrationInterface {
  name = 'UserLevelsClicks1613893460020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_level_entity_userlevel_enum" AS ENUM('0', '1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_level_entity" ("id" SERIAL NOT NULL, "userLevel" "user_level_entity_userlevel_enum" NOT NULL, "allowedClicks" bigint NOT NULL, "extraClicks" bigint NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_524f5ee3f3715c3697bd66ba17c" UNIQUE ("userLevel"), CONSTRAINT "PK_d49835b96baa71da64cdcf35614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO public.user_level_entity ("userLevel","allowedClicks") VALUES ('0',5000);`,
    );
    await queryRunner.query(
      `INSERT INTO public.user_level_entity ("userLevel","allowedClicks") VALUES ('1',25000);`,
    );
    await queryRunner.query(
      `INSERT INTO public.user_level_entity ("userLevel","allowedClicks") VALUES ('2',150000);`,
    );
    await queryRunner.query(
      `INSERT INTO public.user_level_entity ("userLevel","allowedClicks") VALUES ('3',1500000);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_level_entity"`);
    await queryRunner.query(`DROP TYPE "user_level_entity_userlevel_enum"`);
  }
}
