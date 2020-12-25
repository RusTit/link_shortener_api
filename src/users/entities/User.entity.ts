import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 150,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    length: 73, // bcrypt based
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  is_active!: boolean;

  @Column({
    default: null,
    nullable: true,
  })
  activation_token!: string;

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
