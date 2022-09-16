import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class CategoryEntity extends Base {
  @Column()
  name: string;

  @Column()
  color: string;
}
