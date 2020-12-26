import { Job, DoneCallback } from 'bull';
import { Logger } from '@nestjs/common';

export default async function (job: Job, cb: DoneCallback) {
  Logger.debug(`Report task: [${process.pid}] ${JSON.stringify(job.data)}`);
  cb(null, 'It works');
}
