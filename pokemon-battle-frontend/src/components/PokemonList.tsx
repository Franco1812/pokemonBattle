import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemButton, CircularProgress, Typography } from '@mui/material';
import { Pokemon } from './types';

interface PokemonListProps {
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onSelect }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
	axios.get('http://localhost:3000/pokemon')
	  .then(response => {
		if (Array.isArray(response.data)) {
		  setPokemons(response.data);
		} else {
		  setError('Invalid response format');
		}
		setLoading(false);
	  })
	  .catch(error => {
		setError('Error fetching pokemons');
		setLoading(false);
	  });
  }, []);

  if (loading) {
	return <CircularProgress />;
  }

  if (error) {
	return <Typography color="error">{error}</Typography>;
  }

  return (
	<List style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
	  {pokemons.map(pokemon => (
		<ListItem key={pokemon.id} style={{ width: 'auto', textAlign: 'center' }}>
		  <ListItemButton onClick={() => onSelect(pokemon)}>
			<img src={pokemon.imageUrl} alt={pokemon.name} style={{ width: 100, height: 100 }} />
			<ListItemText primary={pokemon.name} />
		  </ListItemButton>
		</ListItem>
	  ))}
	</List>
  );
};

export default PokemonList;