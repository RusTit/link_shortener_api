import { Inject, Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
import {
  CreateRedirect,
  CreateUpdateDomain,
  DeleteDomain,
  DeleteRedirect,
  UpdateRedirect,
} from './models';

export async function runRequest(url: string, body: string): Promise<void> {
  const res = await fetch(url, {
    method: 'post',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
  const json = await res.json();
  Logger.debug(json);
}

@Injectable()
export class LinkEngineService {
  constructor(@Inject('LINK_ENGINE_URL') private readonly linkUrl: string) {}

  async createOrUpdateDomain(data: CreateUpdateDomain): Promise<boolean> {
    try {
      const url = `${this.linkUrl}/api/update_domain`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }

  async deleteDomain(data: DeleteDomain): Promise<boolean> {
    try {
      const url = `${this.linkUrl}/api/delete_domain`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }

  async createRedirect(data: CreateRedirect): Promise<boolean> {
    try {
      const url = `${this.linkUrl}/api/create`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }

  async updateRedirect(data: UpdateRedirect): Promise<boolean> {
    try {
      const url = `${this.linkUrl}/api/update_redirect`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }

  async deleteRedirect(data: DeleteRedirect): Promise<boolean> {
    try {
      const url = `${this.linkUrl}/api/delete_redirect`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      return false;
    }
    return true;
  }
}
