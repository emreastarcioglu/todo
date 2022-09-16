import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export abstract class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone', update: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updateAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  archivedAt: Date | null;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
