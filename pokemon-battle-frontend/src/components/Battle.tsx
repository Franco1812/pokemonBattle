import React, { useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { Pokemon } from './types';

interface BattleProps {
    selectedPokemon: Pokemon;
}

const Battle: React.FC<BattleProps> = ({ selectedPokemon }) => {
    const [opponent, setOpponent] = useState<Pokemon | null>(null);
    const [result, setResult] = useState<{ winner: string } | null>(null);

    const startBattle = () => {
        axios.get('/api/pokemons/random')
            .then(response => {
                setOpponent(response.data);
                return axios.post('/api/battle', {
                    pokemon1: selectedPokemon.id,
                    pokemon2: response.data.id
                });
            })
            .then(response => setResult(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Battle</h2>
            {selectedPokemon && <PokemonCard pokemon={selectedPokemon} onSelect={() => {}} />}
            {opponent && <PokemonCard pokemon={opponent} onSelect={() => {}} />}
            <button onClick={startBattle}>Start Battle</button>
            {result && <div>Winner: {result.winner}</div>}
        </div>
    );
};

export default Battle;