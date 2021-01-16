import { Controller } from '@nestjs/common';
import { EngineService } from './engine.service';

@Controller('engine')
export class EngineController {
  constructor(private readonly engineService: EngineService) {}
}
