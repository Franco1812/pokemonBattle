import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { BattleDto } from './dto/battle.dto';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async startBattle(battleDto: BattleDto): Promise<{ winner: Pokemon, loser: Pokemon, id: number }> {
    const { pokemon1Id } = battleDto;
    const selectedPokemon = await this.findPokemonById(pokemon1Id);
    if (!selectedPokemon) {
      throw new Error('Pokémon no encontrado');
    }

    const opponentPokemon = await this.findRandomOpponent(pokemon1Id);

    const winner = Math.random() > 0.5 ? selectedPokemon : opponentPokemon;
    const loser = winner.id === selectedPokemon.id ? opponentPokemon : selectedPokemon;

    // Incluir todas las propiedades del Pokémon en la respuesta
    return {
      winner,
      loser,
      id: Math.floor(Math.random() * 100), // Generar un ID aleatorio para la batalla
    };
  }

  private async findPokemonById(id: string): Promise<Pokemon> {
    return await this.pokemonRepository.findOne({ where: { id } });
  }

  private async findRandomOpponent(excludeId: string): Promise<Pokemon> {
    const pokemons = await this.pokemonRepository.find({ where: { id: Not(excludeId) } });
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    return pokemons[randomIndex];
  }
}