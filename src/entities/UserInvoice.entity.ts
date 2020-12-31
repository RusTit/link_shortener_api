import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { UserPayment } from './UserPayment.entity';

export enum UserInvoiceType {
  MONTHLY_PLAN_FEE = 0,
  EXTRA_CLICK_FEE = 1,
}

@Entity()
export class UserInvoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: UserInvoiceType,
    default: UserInvoiceType.MONTHLY_PLAN_FEE,
  })
  invoice_type!: UserInvoiceType;

  @Column({
    type: 'money',
    nullable: false,
  })
  amount!: number;

  @ManyToOne(() => User, (user) => user.invoices)
  user!: User;

  @ManyToOne(() => UserPayment, (userPayment) => userPayment.invoices)
  payment!: UserPayment;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  billing_period_start!: Date;

  @Column({
    type: 'timestamp with time zone',
    nullable: false,
  })
  billing_period_end!: Date;

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
