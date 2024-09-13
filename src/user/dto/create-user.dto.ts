import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from '@nestjs/class-validator';
import { Roles } from '../interfaces/roles.interface';

export class CreateUserDto {
  @IsString()
  @Length(3, 30, { message: 'incorrect length ' })
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsEnum(Roles, { message: 'Role must be either "admin" or "user".' })
  @IsString()
  @IsOptional()
  role: string;
  @IsString()
  @IsOptional()
  avatar: string;
}
