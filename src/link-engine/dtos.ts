import { ApiProperty } from '@nestjs/swagger';

export class BaseDomain {
  @ApiProperty({
    required: true,
    example: '192.99.10.113:12000',
  })
  domain!: string;
}

export class DeleteDomain extends BaseDomain {}

export class CreateUpdateDomain extends BaseDomain {
  @ApiProperty({
    required: true,
    example: '2022-11-17 12:00:00',
  })
  expired_on!: string;
  @ApiProperty({
    required: true,
    example: 'http://rsdn.ru',
  })
  default_url!: string;
  @ApiProperty({
    required: true,
    example: 'http://google.com',
  })
  no_url_failover_url!: string;
  @ApiProperty({
    required: true,
    example: 'http://boost.org',
  })
  expired_url_failover_url!: string;
  @ApiProperty({
    required: true,
    example: 'http://ori.org',
  })
  out_of_reach_failover_url!: string;
  @ApiProperty({
    required: true,
    example: ['RU', 'US'],
  })
  whitelist!: string[];
}

export class CreateRedirect {
  @ApiProperty({
    required: true,
    example: 'http://yandex.ru',
  })
  orig_url!: string;
  @ApiProperty({
    required: true,
    example: '2020-11-17 17:39:49.546162',
  })
  created_on!: string;
  @ApiProperty({
    required: true,
    example: '2021-11-17 17:39:49.546162',
  })
  expired_on!: string;
  @ApiProperty({
    required: true,
    example: 'knockknock',
  })
  sms_uuid!: string;
  @ApiProperty({
    required: true,
    example: '192.99.10.113:12000',
  })
  domain!: string;
  @ApiProperty({
    required: true,
    example: ['RU', 'US'],
  })
  whitelist!: string[];
}

export class UpdateRedirect {
  @ApiProperty({
    required: true,
    example: 'http://192.99.10.113:12000/LBItIU',
  })
  newUrl!: string;
  @ApiProperty({
    required: true,
    example: 'http://lamoda.ru',
  })
  orig_url!: string;
  @ApiProperty({
    required: true,
    example: '2022-11-17 12:00:00',
  })
  expired_on!: string;
  @ApiProperty({
    required: true,
    example: 'ywtwy',
  })
  sms_uuid!: string;
  @ApiProperty({
    required: true,
    example: ['', 'RU', 'US'],
  })
  whitelist!: string[];
}

export class DeleteRedirect {
  @ApiProperty({
    required: true,
    example: 'http://localhost:12000/LBItIU',
  })
  newUrl!: string;
}
