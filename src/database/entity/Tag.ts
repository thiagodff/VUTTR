import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity
} from 'typeorm';

import { Tool } from './Tool';

@Entity('tags')
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Tool, { onDelete: 'CASCADE' })
  @JoinColumn()
  tool!: Tool;
}
