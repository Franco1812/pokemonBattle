import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BattleResult } from '../battle-result/entities/battle-result.entity';
import { Pokemon } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class BattleService {
	constructor(
		@InjectRepository(BattleResult)
		private readonly battleResultRepository: Repository<BattleResult>,
		@InjectRepository(Pokemon)
		private readonly pokemonRepository: Repository<Pokemon>,
	) {}

	async startBattle(battleDto: { pokemon1Id: string }): Promise<{ winner: { id: string, name: string }, opponent: { id: string, name: string } }> {
		const pokemon1 = await this.findPokemonById(battleDto.pokemon1Id);
		const pokemon2 = await this.findRandomOpponent();

		let attacker = pokemon1;
		let defender = pokemon2;

		// Determinar el primer atacante basado en velocidad y ataque
		if (pokemon2.speed > pokemon1.speed || (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)) {
			attacker = pokemon2;
			defender = pokemon1;
		}

		// Lógica de batalla
		while (pokemon1.hp > 0 && pokemon2.hp > 0) {
			// Calcular daño
			const damage = Math.max(attacker.attack - defender.defense, 1);
			defender.hp -= damage;

			// Intercambiar roles
			[attacker, defender] = [defender, attacker];
		}

		// Determinar el ganador
		const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;
		const loser = pokemon1.hp > 0 ? pokemon2 : pokemon1;

		// Guardar el resultado de la batalla
		const result = new BattleResult();
		result.winner = winner;
		result.loser = loser;

		await this.battleResultRepository.save(result);

		// Devolver el resultado de la batalla
		return {
			winner: { id: winner.id, name: winner.name },
			opponent: { id: loser.id, name: loser.name }
		};
	}

	private async findPokemonById(id: string): Promise<Pokemon> {
		return await this.pokemonRepository.findOne({ where: { id } });
	}

	private async findRandomOpponent(): Promise<Pokemon> {
		const pokemons = await this.pokemonRepository.find();
		const randomIndex = Math.floor(Math.random() * pokemons.length);
		return pokemons[randomIndex];
	}
}