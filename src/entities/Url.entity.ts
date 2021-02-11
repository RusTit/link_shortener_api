import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'url',
})
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'int4',
    nullable: false,
  })
  url_id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
  })
  url!: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  created_on!: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  expired_on!: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
  })
  default_url!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
  })
  no_url_failover_url!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
  })
  expired_url_failover_url!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
  })
  out_of_reach_failover_url!: string | null;

  @Column({
    type: 'int4',
    nullable: true,
  })
  user_id!: number | null;
}
