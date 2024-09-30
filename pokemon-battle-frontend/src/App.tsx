import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importar el archivo CSS
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
    setOpponentPokemon(null); // Ocultar la tarjeta del oponente
    setBattleResult(null); // Ocultar el resultado de la batalla
  };

  const startBattle = () => {
    if (selectedPokemon) {
      axios.post('http://localhost:3000/battle', { pokemon1Id: selectedPokemon.id })
        .then(response => {
          const { winner, loser } = response.data;

          // Verificar que la respuesta contenga los datos necesarios
          if (!winner || !loser) {
            console.error('La respuesta del servidor no contiene los datos esperados.');
            return;
          }

          // Determinar el oponente basado en el ID del Pokémon seleccionado
          const opponentPokemon = selectedPokemon.id === winner.id ? loser : winner;
          setOpponentPokemon(opponentPokemon);

          // Mostrar el resultado de la batalla
          setBattleResult(`${winner.name} wins!`);
        })
        .catch(error => {
          console.error('Error al iniciar la batalla:', error);
        });
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