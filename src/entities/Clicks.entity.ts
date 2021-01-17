import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'clicks',
})
export class Clicks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  new_url!: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  replaced_url!: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  clicked_on!: Date | null;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  from_ip!: string | null;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  sms_uuid!: string | null;
}
