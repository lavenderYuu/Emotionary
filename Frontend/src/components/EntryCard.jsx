import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector, useDispatch } from "react-redux"
import { useMemo } from 'react';
import { selectEntry, deleteEntry, resetEntry, favoriteEntry, fetchEntries } from '../features/entries/entriesSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getDate, getTags } from '../utils/helpers';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { selectSortedTags } from '../features/tags/tagsSelectors';
import { useTheme } from '@mui/material';

// base components: https://mui.com/material-ui/react-card/, https://mui.com/material-ui/react-menu/

const EntryCard = ({ entries, onClick, onEdit }) => {
  const tags = useSelector(selectSortedTags);
  const entry = useSelector((state) => state.entries.activeEntry);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [alert, setAlert] = useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(resetEntry());
  };

  const handleEdit = () => {
    setAnchorEl(null);
    onEdit();
  };

  const tagMap = useMemo(() => getTags(tags), [tags]);

  const handleFavorite = async (e, entry) => {
    e.stopPropagation();
    dispatch(favoriteEntry(entry));
  }

  const handleKebab = (e, id) => {
    e.stopPropagation(); 
    setAnchorEl(e.currentTarget);
    dispatch(selectEntry(id));
  }

  const handleNevermind = () => {
    setAnchorEl(null);
    setAlert(false);
  }

  const handleDelete = async () => {
    setAnchorEl(null);
    setAlert(false);
    await dispatch(deleteEntry(entry)).unwrap();
    dispatch(resetEntry());
    dispatch(fetchEntries());
    handleClose();
  }

  if (entries.length === 0) {
    return <Box sx={{ margin: 4 }}>Whoops, you have no journal entries! Please create an entry.</Box>
  }

  return (
    <>
     <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      flexWrap: 'wrap', 
      alignItems: 'center', 
      gap: 2, 
      p: 2 }}>
        {entries.map((entry, index) => (
          <Box
            key={index}
            sx={{ margin: '8px' }}>
              <Card 
                onClick={() => onClick(entry._id)}
                sx={{ 
                  width: 280,
                  height: 224,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 'none',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: theme.palette.action.hover }
                }}>
                <CardHeader
                  title={
                    <Typography
                      noWrap
                      sx={{
                        width: '222px',
                        fontSize: '20px',
                      }}
                    >
                      {entry.title}
                    </Typography>
                  }
                  subheader={getDate(entry.date)}
                  action={
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={'menu'}
                      aria-expanded={'menu'}
                      aria-haspopup="true"
                      onClick={(e) => handleKebab(e, entry._id)}
                      sx={{
                        top: -2,
                        right: 8
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{
                    width: '100%',
                    display:'flex',
                    justifyContent: 'space-between',
                }}/>
                <CardContent sx={{
                  pt: 0,
                  pb: 0
                }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      display: '-webkit-box', // https://stackoverflow.com/questions/5269713/css-ellipsis-on-second-line
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis',
                      fontSize: 16,
                    }}>
                    {entry.content}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={(e) => handleFavorite(e, entry)}
                  >
                    {entry.favorite === true ? 
                      <FavoriteIcon color="error" /> : 
                      <FavoriteBorderOutlinedIcon />}
                  </IconButton>
                  <Box sx={{ fontSize: 18, padding: '8px' }}>
                    {entry.mood}
                  </Box>
                </CardActions>
              </Card>
          </Box>
        ))}
     </Box>
     {entry &&
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        slotProps={{
          paper: {
            style: {
              width: '14ch',
              boxShadow: 1,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 6,
            },
          }
        }}
      >
        <MenuItem key='edit' onClick={handleEdit}>
          Edit
        </MenuItem>
        <MenuItem key='delete' onClick={() => setAlert(true)}>
          Delete
        </MenuItem>
      </Menu>}
      <Dialog
        open={alert}
        onClose={handleNevermind}
        slotProps={{
          paper: {
            sx: { 
            borderRadius: 4
          }
          }
        }}>
          <DialogTitle>Are you sure you want to delete this entry?</DialogTitle>
          <DialogContent>Deleting this entry will remove it from your entries history and your mood graph. You will not be able to undo this action.</DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Button onClick={handleNevermind}>Nevermind</Button>
            <Button onClick={handleDelete}>Yes, delete</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default EntryCard;
