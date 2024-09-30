import React from 'react';
import { Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
	<header style={{ textAlign: 'center', margin: '20px 0' }}>
	  <Typography variant="h2">Battle of Pokémon</Typography>
	</header>
  );
};

export default Header;