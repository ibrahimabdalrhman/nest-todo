import { IsDate, IsString } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger'; // Import Swagger decorator

export class CreateTodoDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A brief description of the todo',
    example: 'Milk, eggs, bread',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The due date for the todo',
    example: '2024-09-23T00:00:00Z',
  })
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date instance' })
  date: Date;
}
