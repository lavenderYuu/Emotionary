import Button from '@mui/material/Button';
import { sentimentEmojiMap } from '../../utils/helpers';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MoodButton = ({ mood, onSelectMood }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (selectedMood) => {
    onSelectMood(selectedMood);
    handleClose();
  };

  return (
    <>
      <Button
        variant="text"
        sx={{
          whiteSpace: 'nowrap',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          textTransform: 'none',
          color: '#3d3d3d',
          "&:hover": {
            backgroundColor: "#f5eee4",
          }
        }}
        onClick={handleClick}
      >
        Mood: {mood}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            style: {
              border: '1px solid #e2d2be',
              borderRadius: 6,
              boxShadow: 1,
            },
          }
        }}
      >
        {Object.entries(sentimentEmojiMap).map(([label, emoji]) => (
          <MenuItem key={label} onClick={() => handleMenuItemClick(emoji)} sx={{ fontFamily: 'Outfit, sans-serif' }}>
            {label} {emoji}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default MoodButton;