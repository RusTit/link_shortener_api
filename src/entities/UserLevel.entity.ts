import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLevel } from './User.entity';

@Entity()
export class UserLevelEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: UserLevel,
    unique: true,
    nullable: false,
  })
  userLevel!: UserLevel;

  @Column({
    type: 'int8',
    nullable: false,
  })
  allowedClicks!: number;

  @Column({
    type: 'int8',
    nullable: false,
    default: 0,
  })
  extraClicks!: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
  })
  updatedAt!: Date;
}
