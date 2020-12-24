import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    required: true,
    format: 'email',
  })
  email!: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    format: 'password',
    minLength: 6,
  })
  password!: string;
}
