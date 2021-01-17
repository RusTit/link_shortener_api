import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'url_whitelist',
})
export class UrlWhitelistEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'int4',
    nullable: false,
  })
  url_id!: number;

  @Column({
    type: 'varchar',
    length: 8,
    nullable: false,
  })
  country_iso!: string;
}
