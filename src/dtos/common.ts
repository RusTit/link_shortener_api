import { ApiProperty } from '@nestjs/swagger';

export class BaseListQuery {
  @ApiProperty({
    required: false,
    default: 0,
  })
  skip?: number = 0;

  @ApiProperty({
    required: false,
    default: 100,
  })
  take?: number = 100;
}
