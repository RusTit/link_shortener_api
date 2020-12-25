import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthTokenDto {
  @ApiProperty()
  access_token!: string;
}

export type JwtPayload = {
  id: number;
  timestamp: Date;
};

export class UserCredentialsDto {
  @ApiProperty({
    required: true,
    format: 'email',
  })
  @IsEmail()
  username!: string;

  @ApiProperty({
    required: true,
    minLength: 6,
  })
  @IsNotEmpty()
  password!: string;
}
