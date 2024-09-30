import React from 'react';
import { Card, CardContent, Typography, CardMedia, LinearProgress } from '@mui/material';
import { Pokemon } from './types';

interface BattlePokemonCardProps {
  pokemon: Pokemon;
}

const BattlePokemonCard: React.FC<BattlePokemonCardProps> = ({ pokemon }) => {
  const maxStatValue = Math.max(pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed);

  return (
    <Card style={{ margin: '10px', width: '200px' }}>
      <CardMedia
        component="img"
        height="200"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          HP:
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.hp / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Attack:
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.attack / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Defense:
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.defense / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Speed:
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.speed / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Type: {pokemon.type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BattlePokemonCard;