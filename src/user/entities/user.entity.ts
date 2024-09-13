import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../interfaces/roles.interface';

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
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: string;
}
