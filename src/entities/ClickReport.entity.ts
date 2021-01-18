import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'click_reports',
})
export class ClickReportEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  report_time!: Date;

  @Column({
    nullable: false,
  })
  country!: string;

  @Column({
    nullable: false,
  })
  referrer!: string;

  @Column({
    nullable: false,
  })
  orig_domain!: string;

  @Column({
    nullable: false,
  })
  proxy_domain!: string;

  @Column({
    nullable: false,
  })
  campaign_id!: number;

  @Column({
    nullable: false,
  })
  count!: number;
}
