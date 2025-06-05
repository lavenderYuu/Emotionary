import * as React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
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
      Sign Out
    </Button>
  );
}

export default LogoutButton;