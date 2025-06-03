import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const LoginButton = ({ onClick }) => {
  return (
    <Stack spacing={2} direction="row" ml={0.5}>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        sx={{ 
            backgroundColor: '#ffe59a',
            color: '#3d3d3d',
            borderRadius: '30px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 500,
            textTransform: 'none',
        }}
        onClick={onClick}
      >
        Sign In
      </Button>
    </Stack>
  );
}

export default LoginButton;