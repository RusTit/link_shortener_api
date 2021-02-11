import { Inject, Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
import {
  CreateRedirect,
  CreateUpdateDomain,
  DeleteDomain,
  DeleteRedirect,
  UpdateRedirect,
} from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from '../entities/Url.entity';
import { User } from '../entities/User.entity';
import { Repository } from 'typeorm';

export async function runRequest(url: string, body: string): Promise<void> {
  const res = await fetch(url, {
    method: 'post',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
  const httpCode = res.status;
  // const json = await res.json();
  // Logger.debug(json);
  Logger.debug(`Http code: ${httpCode}`);
}

@Injectable()
export class LinkEngineService {
  constructor(
    @Inject('LINK_ENGINE_URL') private readonly linkUrl: string,
    @InjectRepository(UrlEntity)
    private urlEntityRepository: Repository<UrlEntity>,
  ) {}

  async createOrUpdateDomain(
    data: CreateUpdateDomain,
    user: User,
  ): Promise<[boolean, string]> {
    try {
      const existingEntity = await this.urlEntityRepository.findOne({
        where: {
          url: data.domain,
        },
      });
      if (existingEntity) {
        return [false, 'Domain is already in use'];
      }
      const url = `${this.linkUrl}/api/update_domain`;
      await runRequest(url, JSON.stringify(data));
      const createdEntity = await this.urlEntityRepository.findOne({
        where: {
          url: data.domain,
        },
      });
      if (!createdEntity) {
        return [false, 'Domain is not created by link-engine'];
      }
      createdEntity.user_id = user.id;
      await this.urlEntityRepository.save(createdEntity);
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async getList(user: User): Promise<UrlEntity[]> {
    return this.urlEntityRepository.find({
      where: {
        user_id: user.id,
      },
    });
  }

  async deleteDomain(
    data: DeleteDomain,
    user: User,
  ): Promise<[boolean, string]> {
    try {
      const existingEntity = await this.urlEntityRepository.findOne({
        where: {
          url: data.domain,
          user_id: user.id,
        },
      });
      if (!existingEntity) {
        return [false, 'Domain is not set!'];
      }
      const url = `${this.linkUrl}/api/delete_domain`;
      await runRequest(url, JSON.stringify(data));
      const deletedEntity = await this.urlEntityRepository.findOne({
        where: {
          url: data.domain,
          user_id: user.id,
        },
      });
      if (deletedEntity) {
        return [false, `Domain wasn't deleted`];
      }
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async createRedirect(data: CreateRedirect): Promise<[boolean, string]> {
    try {
      const url = `${this.linkUrl}/api/create`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async updateRedirect(data: UpdateRedirect): Promise<[boolean, string]> {
    try {
      const url = `${this.linkUrl}/api/update_redirect`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async deleteRedirect(data: DeleteRedirect): Promise<[boolean, string]> {
    try {
      const url = `${this.linkUrl}/api/delete_redirect`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }
}
