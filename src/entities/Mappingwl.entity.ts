import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'mappingwl',
})
export class MappingwlEntity {
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
    length: 8,
    nullable: false,
  })
  country_iso!: string;
}
