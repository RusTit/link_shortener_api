import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({
    required: true,
    format: 'boolean',
  })
  is_active!: boolean;
}
