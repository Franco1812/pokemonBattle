import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
	<MuiButton variant="contained" color="primary" onClick={onClick} style={{ margin: '20px' }}>
	  {label}
	</MuiButton>
  );
};

export default Button;