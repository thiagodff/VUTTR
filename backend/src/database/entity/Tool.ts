import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  // CreateDateColumn,
  // UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';

import { User } from './User';

@Entity('tools')
export class Tool extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  link!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, {
    cascade: true
  })
  @JoinColumn()
  user!: User;

  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)'
  // })
  // createdAt!: Date;

  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  //   onUpdate: 'CURRENT_TIMESTAMP(6)'
  // })
  // updatedAt!: Date;
}
