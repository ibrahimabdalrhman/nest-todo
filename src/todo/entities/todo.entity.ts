import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  expired: boolean;

  // Relation with User entity
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'userId' }) // Optionally specify the column name
  user: User;

  // Store the current date for comparison
  private currentDate: Date;

  // Check if the todo is expired after loading from the database
  @AfterLoad()
  checkExpirationOnLoad() {
    this.currentDate = new Date();
    this.updateExpiration();
  }

  // Check if the todo is expired before inserting into the database
  @BeforeInsert()
  @BeforeUpdate()
  checkExpirationBeforeSave() {
    this.updateExpiration();
  }

  // Update the expired field based on the current date
  private updateExpiration() {
    if (this.date < this.currentDate) {
      this.expired = true;
    } else {
      this.expired = false;
    }
  }
}
