import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClickReportTimestamps1613904233562 implements MigrationInterface {
  name = 'ClickReportTimestamps1613904233562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "click_reports" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "click_reports" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "click_reports" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "click_reports" DROP COLUMN "created_at"`,
    );
  }
}
