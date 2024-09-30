import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import BattleResult from './components/BattleResult';
import BattlePokemonCard from './components/BattlePokemonCard';
import Button from './components/Button';
import { Pokemon } from './components/types';
import { Typography } from '@mui/material';

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [battleResult, setBattleResult] = useState<string | null>(null);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setOpponentPokemon(null); 
    setBattleResult(null); 
  };

  const startBattle = () => {
    if (selectedPokemon) {
      axios.post('http://localhost:3000/battle', { pokemon1Id: selectedPokemon.id })
        .then(response => {
          const winner = response.data.winner;
          const loser = response.data.loser;
          const opponent = selectedPokemon.id === winner.id ? loser : winner;
          setOpponentPokemon(opponent);

          setBattleResult(`${winner.name} wins!`);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <Header />
      <Typography variant="h4" align="center">Select your pokemon</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <PokemonList onSelect={handleSelectPokemon} />
      </div>
      {battleResult && <BattleResult result={battleResult} />}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedPokemon && <BattlePokemonCard pokemon={selectedPokemon} />}
        {opponentPokemon && <BattlePokemonCard pokemon={opponentPokemon} />}
      </div>
      {selectedPokemon && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={startBattle} className="green-button">Start Battle</button>
        </div>
      )}
    </div>
  );
};

export default App;