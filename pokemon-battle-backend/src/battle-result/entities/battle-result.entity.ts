import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;

  @ManyToOne(() => Pokemon)
  loser: Pokemon;
}