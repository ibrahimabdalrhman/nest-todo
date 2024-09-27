import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger decorator
import { Roles } from '../../user/interfaces/roles.interface';

export class SignupDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsString()
  @Length(3, 30, { message: 'incorrect length' })
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPass123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'user',
    enum: Roles,
  })
  @IsEnum(Roles, { message: 'Role must be either "admin" or "user".' })
  @IsOptional() // Optional because you might want the default role to be 'user'
  role: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'http://example.com/avatar.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar: string;
}
