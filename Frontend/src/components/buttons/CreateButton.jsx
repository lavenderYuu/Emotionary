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
          fontWeight: 500,
          fontSize: 14,
          textTransform: 'none',
          boxShadow: 8,
          m: 1,
          p: 2,
          position: 'fixed',
          bottom: 72,
          right: 72,
          zIndex: 10,
          "&:hover": {
            boxShadow: 12,
          }
      }}
      onClick={onClick}
    >
      <CreateOutlinedIcon sx={{ mr: 1 }} />
      Create an entry
    </Button>
  );
}

export default CreateButton;