import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthGuard } from 'src/auth/jwt/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesEnum } from 'src/user/interfaces/roles.interface';

@ApiTags('todo') // Group all routes under "todo" in Swagger UI
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('search') search: string,
    @Query('completed') completed: boolean,
  ) {
    return this.todoService.findAll(req.user, page, limit, sort, order, search, completed);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific todo by ID' })
  @ApiResponse({ status: 200, description: 'Return the specific todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.todoService.findOne(+id, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/complete')
  @ApiOperation({ summary: 'complete a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  complete(@Param('id') id: number, @Request() req) {
    return this.todoService.complete(+id, req.user);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(+id, updateTodoDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.todoService.remove(+id, req.user);
  }
}
