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
import { MappingEntity } from '../entities/Mapping.entity';
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
    private readonly urlEntityRepository: Repository<UrlEntity>,
    @InjectRepository(MappingEntity)
    private readonly mappingEntityRepository: Repository<MappingEntity>,
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

  async getDomainsList(user: User): Promise<UrlEntity[]> {
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

  async createRedirect(
    data: CreateRedirect,
    user: User,
  ): Promise<[boolean, string]> {
    try {
      const existingEntity = await this.mappingEntityRepository.findOne({
        where: {
          orig_url: data.orig_url,
        },
      });
      if (existingEntity) {
        return [false, 'Redirection already exist'];
      }
      const url = `${this.linkUrl}/api/create`;
      await runRequest(url, JSON.stringify(data));
      const createdEntity = await this.mappingEntityRepository.findOne({
        where: {
          orig_url: data.orig_url,
        },
      });
      if (!createdEntity) {
        return [false, 'Redirection was not created'];
      }
      createdEntity.user_id = user.id;
      await this.mappingEntityRepository.save(createdEntity);
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async getRedirectionsList(user: User): Promise<MappingEntity[]> {
    return this.mappingEntityRepository.find({
      where: {
        user_id: user.id,
      },
    });
  }

  async updateRedirect(
    data: UpdateRedirect,
    user: User,
  ): Promise<[boolean, string]> {
    try {
      const existingEntity = await this.mappingEntityRepository.findOne({
        where: {
          orig_url: data.orig_url,
          user_id: user.id,
        },
      });
      if (!existingEntity) {
        return [false, 'Redirection is not exist'];
      }
      const url = `${this.linkUrl}/api/update_redirect`;
      await runRequest(url, JSON.stringify(data));
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }

  async deleteRedirect(
    data: DeleteRedirect,
    user: User,
  ): Promise<[boolean, string]> {
    try {
      const existingEntity = await this.mappingEntityRepository.findOne({
        where: {
          new_url: data.newUrl,
          user_id: user.id,
        },
      });
      if (!existingEntity) {
        return [false, 'Redirection is not exist'];
      }
      const url = `${this.linkUrl}/api/delete_redirect`;
      await runRequest(url, JSON.stringify(data));
      const deletedEntity = await this.mappingEntityRepository.findOne({
        where: {
          new_url: data.newUrl,
          user_id: user.id,
        },
      });
      if (deletedEntity) {
        return [false, 'Redirection was not deleted'];
      }
    } catch (e) {
      Logger.error(e);
      return [false, e.message];
    }
    return [true, 'ok'];
  }
}
