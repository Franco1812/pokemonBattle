import React from 'react';
import { Card, CardContent, Typography, CardMedia, LinearProgress } from '@mui/material';
import { Pokemon } from './types';

interface BattlePokemonCardProps {
  pokemon: Pokemon;
}

const BattlePokemonCard: React.FC<BattlePokemonCardProps> = ({ pokemon }) => {
  // Calcular el valor máximo de las estadísticas
  const maxStatValue = Math.max(pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed);

  return (
    <Card style={{ margin: '10px', width: '200px' }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        style={{ objectFit: 'contain' }} // Ajustar la imagen para que no se recorte
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/140';
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          HP: {pokemon.hp}
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.hp / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Attack: {pokemon.attack}
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.attack / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Defense: {pokemon.defense}
        </Typography>
        <LinearProgress variant="determinate" value={(pokemon.defense / maxStatValue) * 100} />
        <Typography variant="body2" color="text.secondary">
          Speed: {pokemon.speed}
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