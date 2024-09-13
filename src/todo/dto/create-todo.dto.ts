import { IsDate, IsString } from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date instance' })
  date: Date;
}
