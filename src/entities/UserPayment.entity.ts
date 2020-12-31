import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { UserInvoice } from './UserInvoice.entity';

export enum PaymentGatewayType {
  PAYPAL = '1',
  STRIPE = '2',
  CoinPayment = '3',
}

@Entity()
export class UserPayment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'text',
    unique: false, // ? maybe make true index?
  })
  payment_id!: string;

  @Column({
    type: 'enum',
    enum: PaymentGatewayType,
  })
  payment_gateway!: PaymentGatewayType;

  @Column({
    type: 'money',
    nullable: false,
  })
  amount!: number;

  @OneToMany(() => UserInvoice, (userInvoice) => userInvoice.payment, {
    cascade: ['insert', 'update', 'remove', 'recover', 'soft-remove'],
  })
  invoices!: UserInvoice[];

  @ManyToOne(() => User, (user) => user.payments)
  user!: User;

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
