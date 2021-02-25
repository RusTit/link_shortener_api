import { Injectable } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ClickReportEntity } from '../entities/ClickReport.entity';
import { MappingEntity } from '../entities/Mapping.entity';
import { BaseListQuery } from '../dtos/common';

@Injectable()
export class ClickReportService {
  constructor(
    @InjectRepository(ClickReportEntity)
    private readonly clickReportEntityRepository: Repository<ClickReportEntity>,
    @InjectRepository(MappingEntity)
    private readonly mappingEntityRepository: Repository<MappingEntity>,
  ) {}

  async findAll(
    user: User,
    options?: BaseListQuery,
  ): Promise<ClickReportEntity[]> {
    const usersMappings = await this.mappingEntityRepository.find({
      where: {
        user_id: user.id,
      },
      skip: options?.skip,
      take: options?.take,
      select: ['new_url'],
    });
    const proxyDomains = usersMappings.map((entity) => entity.new_url);
    return this.clickReportEntityRepository.find({
      where: {
        proxy_domain: In(proxyDomains),
      },
    });
  }

  async findOne(
    id: number,
    user: User,
  ): Promise<ClickReportEntity | undefined> {
    const usersMappings = await this.mappingEntityRepository.find({
      where: {
        user_id: user.id,
      },
      select: ['new_url'],
    });
    const proxyDomains = usersMappings.map((entity) => entity.new_url);
    return this.clickReportEntityRepository.findOne({
      where: {
        id,
        proxy_domain: In(proxyDomains),
      },
    });
  }
}
