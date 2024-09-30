import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleDto } from './dto/battle.dto';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  startBattle(@Body() battleDto: BattleDto): Promise<{ winner: Pokemon, loser: Pokemon, id: number }> {
    return this.battleService.startBattle(battleDto);
  }
}