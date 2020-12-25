export class BaseDomain {
  domain!: string;
}

export class DeleteDomain extends BaseDomain {}

export class CreateUpdateDomain extends BaseDomain {
  expired_on!: string;
  default_url!: string;
  no_url_failover_url!: string;
  expired_url_failover_url!: string;
  out_of_reach_failover_url!: string;
  whitelist!: string[];
}

export class CreateRedirect {
  orig_url!: string;
  created_on!: string;
  expired_on!: string;
  sms_uuid!: string;
  domain!: string;
  whitelist!: string[];
}

export class UpdateRedirect {
  newUrl!: string;
  orig_url!: string;
  expired_on!: string;
  sms_uuid!: string;
  whitelist!: string[];
}

export class DeleteRedirect {
  newUrl!: string;
}
