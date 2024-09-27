import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const user = await this.userService.findById(userId); 
    const todo = this.todoRepository.create({ ...createTodoDto, user });
    return await this.todoRepository.save(todo);
  }

  async findAll(
    user,
    page: number = 1,
    limit: number = 10,
    sort: string = 'date',
    order: 'ASC' | 'DESC' = 'ASC',
    search: string = '',
    completed?: boolean,
  ): Promise<{ todos: Todo[]; total: number }> {
    const [todos, total] = await this.todoRepository.findAndCount({
      where: {
        user: { id: user.sub },
        title: search ? Like(`%${search}%`) : undefined, 
        completed: completed !== undefined ? completed : undefined, 
      },
      order: {
        [sort]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { todos, total };
  }

  async findOne(id: number, user: { sub: number }): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.sub } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async complete(id: number, user) {
    const todo = await this.findOne(id, user);
    todo.completed ? (todo.completed = false) : (todo.completed = true);
    return await this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user): Promise<Todo> {
    const todo = await this.findOne(id, user);
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: number, user): Promise<void> {
    const todo = await this.findOne(id, user);
    await this.todoRepository.remove(todo);
  }
}
