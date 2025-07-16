import Button from '@mui/material/Button';

const EditButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{ 
          backgroundColor: '#ffe59a',
          color: '#3d3d3d',
          borderRadius: '30px',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 500,
          textTransform: 'none',
          m: 1
      }}
      onClick={onClick}
    >
      Edit
    </Button>
  );
}

export default EditButton;