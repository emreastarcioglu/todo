import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class TodoEntity extends Base {
  @Column()
  body: string;

  @ManyToOne(() => CategoryEntity, { nullable: true, eager: true })
  category: CategoryEntity;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ default: false })
  isFlagged: boolean;

  @Column({ default: false })
  isCompleted: boolean;
}
