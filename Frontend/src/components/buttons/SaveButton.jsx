import Button from '@mui/material/Button';

const SaveButton = ({ onClick }) => {
  return (
    <Button
      id='save-entry-button'
      variant="contained"
      sx={{ 
          backgroundColor: '#ffbde9',
          color: '#3d3d3d',
          borderRadius: '30px',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 500,
          textTransform: 'none',
          m: 1
      }}
      onClick={onClick}
    >
      Save
    </Button>
  );
}

export default SaveButton;