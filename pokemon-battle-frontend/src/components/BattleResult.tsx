import React from 'react';
import { Typography } from '@mui/material';

interface BattleResultProps {
  result: string;
}

const BattleResult: React.FC<BattleResultProps> = ({ result }) => {
  return (
	<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
	  <div style={{ display: 'inline-block', padding: '10px', border: '2px solid black', borderRadius: '5px', backgroundColor: 'lightblue', textAlign: 'center' }}>
		<Typography variant="h6" component="div">
		  {result}
		</Typography>
	  </div>
	</div>
  );
};

export default BattleResult;