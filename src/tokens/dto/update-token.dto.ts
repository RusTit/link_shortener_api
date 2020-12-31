import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateTokenDto {
  @ApiProperty({
    required: true,
    format: 'boolean',
  })
  @IsBoolean()
  is_active!: boolean;
}

export class TokenDto extends UpdateTokenDto {
  @ApiProperty({
    required: true,
    format: 'uuid',
  })
  @IsUUID(4)
  token!: string;
}
