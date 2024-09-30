import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleDto } from './dto/battle.dto';
import { BattleResult } from '../battle-result/entities/battle-result.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  async battle(@Body() battleDto: BattleDto): Promise<{ winner: { id: string, name: string }, opponent: { id: string, name: string } }> {
    return this.battleService.startBattle(battleDto);
  }
}
