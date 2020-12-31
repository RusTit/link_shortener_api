import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash, compare } from 'bcrypt';
import { UserPayment } from './UserPayment.entity';
import { UserProfile } from './UserProfile.entity';
import { UserInvoice } from './UserInvoice.entity';
import { Token } from './Token.entity';

export const SALT_ROUNDS = 10;

export enum UserLevel {
  FREE = 0,
  STARTER = 1,
  PRO = 2,
  PREMIUM = 3,
}

export enum UserRole {
  STANDART = 0,
  ADMIN = 1,
}

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

  async setPassword(value: string) {
    this.password = await hash(value, SALT_ROUNDS);
  }

  async isPasswordValid(value: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }
    return compare(value, this.password);
  }

  @Column({
    type: 'enum',
    enum: UserLevel,
    default: UserLevel.FREE,
  })
  user_level!: UserLevel;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STANDART,
  })
  user_role!: UserRole;

  @OneToMany(() => UserInvoice, (userInvoice) => userInvoice.user, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  invoices!: UserInvoice[];

  @OneToMany(() => UserPayment, (userPayment) => userPayment.user, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  payments!: UserPayment[];

  @OneToMany(() => Token, (token) => token.user, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  tokens!: Token[];

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
    nullable: true,
    type: 'uuid',
  })
  @Generated('uuid')
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
