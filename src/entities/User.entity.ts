import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserPayment } from './UserPayment.entity';
import { UserProfile } from './UserProfile.entity';
import { UserInvoice } from './UserInvoice.entity';

@Entity()
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
    type: 'varchar',
    length: 73, // bcrypt based
    nullable: true,
  })
  password!: string | null;

  @OneToMany(() => UserInvoice, (userInvoice) => userInvoice.user, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  invoices!: UserInvoice[];

  @OneToMany(() => UserPayment, (userPayment) => userPayment.user, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  payments!: UserPayment[];

  @OneToOne(() => UserProfile, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  profile!: UserProfile;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  is_active!: boolean;

  @Column({
    default: null,
    nullable: true,
    type: 'uuid',
  })
  activation_token!: string | null;

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
