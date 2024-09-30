import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Pokemon } from './types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onSelect }) => {
  return (
	<Card onClick={() => onSelect(pokemon)} style={{ cursor: 'pointer', margin: '10px' }}>
	  <CardMedia
		component="img"
		height="140"
		image={pokemon.imageUrl}
		alt={pokemon.name}
	  />
	  <CardContent>
		<Typography variant="h5" component="div">
		  {pokemon.name}
		</Typography>
	  </CardContent>
	</Card>
  );
};

export default PokemonCard;