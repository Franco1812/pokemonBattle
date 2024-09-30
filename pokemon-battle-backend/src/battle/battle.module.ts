import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { BattleResult } from '../battle-result/entities/battle-result.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BattleResult, Pokemon]),
    PokemonModule,
  ],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
