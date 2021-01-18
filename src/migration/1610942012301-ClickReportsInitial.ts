import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClickReportsInitial1610942012301 implements MigrationInterface {
  name = 'ClickReportsInitial1610942012301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "click_reports" ("id" SERIAL NOT NULL, "report_time" TIMESTAMP NOT NULL, "country" character varying NOT NULL, "referrer" character varying NOT NULL, "orig_domain" character varying NOT NULL, "proxy_domain" character varying NOT NULL, "campaign_id" integer NOT NULL, "count" integer NOT NULL, CONSTRAINT "PK_f2b37235141e90a325b469ff406" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "click_reports"`);
  }
}
