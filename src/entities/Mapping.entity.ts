import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'mapping',
})
export class MappingEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  orig_url!: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  new_url!: string;

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
    length: 32,
    nullable: true,
  })
  sms_uuid!: string | null;

  @Column({
    type: 'int4',
    nullable: true,
  })
  user_id!: number | null;
}
