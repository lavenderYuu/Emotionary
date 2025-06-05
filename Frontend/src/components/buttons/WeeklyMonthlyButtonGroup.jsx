import { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function WeeklyMonthlyButtonGroup({ selected, setSelected }) {

  return (
    <div>
      <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled button group"
      sx={{
        borderRadius: '30px',
        boxShadow: 'none'
      }}
    >
      { selected === 'weekly' ? (
        <div>
          <Button
            onClick={() => setSelected('weekly')}
            sx={{
              backgroundColor: '#ffe59a',
              color: '#3d3d3d',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              m: 0.5,
              '&:hover': {
                backgroundColor: '#ffd966', // Brighter color when hovering
              },
            }}
          >
            Weekly
          </Button>

          <Button
            onClick={() => setSelected('monthly')}
            sx={{
              backgroundColor: '#f2ebd5', // More grayish color when "monthly" is not selected
              color: '#3d3d3d',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              m: 0.5,
              '&:hover': {
                backgroundColor: '#ffd966', // Brighter color when hovering
              },
            }}
          >
            Monthly
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => setSelected('weekly')}
            sx={{
              backgroundColor: '#f2ebd5', // More grayish color when "weekly" is not selected
              color: '#3d3d3d',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              m: 0.5,
              '&:hover': {
                backgroundColor: '#ffd966', // Brighter color when hovering
              },
            }}
          >
            Weekly
          </Button>

          <Button
            onClick={() => setSelected('monthly')}
            sx={{
              backgroundColor: '#ffe59a',
              color: '#3d3d3d',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              textTransform: 'none',
              m: 0.5,
              '&:hover': {
                backgroundColor: '#ffd966', // Brighter color when hovering
              },
            }}
          >
            Monthly
          </Button>
        </div>
      )}
    </ButtonGroup>
  </div>
  );
}