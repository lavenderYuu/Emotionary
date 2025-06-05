import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      sx={(theme) => ({
      position: 'absolute',
      right: 8,
      top: 8,
      color: theme.palette.grey[500],
      })}
    >
      <CloseIcon />
    </IconButton>
  );
}

export default CloseButton;