import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1609398970801 implements MigrationInterface {
  name = 'Initial1609398970801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_invoice_invoice_type_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_invoice" ("id" SERIAL NOT NULL, "invoice_type" "user_invoice_invoice_type_enum" NOT NULL DEFAULT '0', "amount" money NOT NULL, "billing_period_start" TIMESTAMP WITH TIME ZONE NOT NULL, "billing_period_end" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "paymentId" integer, CONSTRAINT "PK_dde8e602cd78265686a0c1cdfb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_payment_gateway_type_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_payment" ("id" SERIAL NOT NULL, "payment_id" text NOT NULL, "gateway_type" "user_payment_gateway_type_enum" NOT NULL, "amount" money NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_57db108902981ff1f5fcc2f2336" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_profile" ("id" SERIAL NOT NULL, "location" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_user_level_enum" AS ENUM('0', '1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_user_role_enum" AS ENUM('0', '1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(73), "user_level" "user_user_level_enum" NOT NULL DEFAULT '0', "user_role" "user_user_role_enum" NOT NULL DEFAULT '0', "is_active" boolean NOT NULL DEFAULT true, "activation_token" uuid DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "token_value" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_invoice" ADD CONSTRAINT "FK_bc720ebcf47103d4fd707d16e93" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_invoice" ADD CONSTRAINT "FK_fc32c843a31abc477db2ce47455" FOREIGN KEY ("paymentId") REFERENCES "user_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_payment" ADD CONSTRAINT "FK_9a70c56afa711c69a105c73de1a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_payment" DROP CONSTRAINT "FK_9a70c56afa711c69a105c73de1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_invoice" DROP CONSTRAINT "FK_fc32c843a31abc477db2ce47455"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_invoice" DROP CONSTRAINT "FK_bc720ebcf47103d4fd707d16e93"`,
    );
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_user_role_enum"`);
    await queryRunner.query(`DROP TYPE "user_user_level_enum"`);
    await queryRunner.query(`DROP TABLE "user_profile"`);
    await queryRunner.query(`DROP TABLE "user_payment"`);
    await queryRunner.query(`DROP TYPE "user_payment_gateway_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_invoice"`);
    await queryRunner.query(`DROP TYPE "user_invoice_invoice_type_enum"`);
  }
}
