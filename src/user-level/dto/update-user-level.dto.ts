import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLevelDto } from './create-user-level.dto';

export class UpdateUserLevelDto extends PartialType(CreateUserLevelDto) {}
