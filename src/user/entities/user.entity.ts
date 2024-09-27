import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../interfaces/roles.interface';
import { Todo } from 'src/todo/entities/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    array: true,
    default: [RolesEnum.USER],
  })
  role: RolesEnum[]; // Change role to be an array of RolesEnum

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
