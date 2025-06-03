import Button from '@mui/material/Button';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const CreateButton = ({ onClick }) => {
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
      <CreateOutlinedIcon />
    </Button>
  );
}

export default CreateButton;