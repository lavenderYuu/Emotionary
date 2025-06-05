import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux"
import { useMemo } from 'react';
import { Box, Chip } from '@mui/material';
import { getDate, getTags } from '../utils/helpers';
import { deleteEntry, editEntry } from '../features/entries/entriesSlice';
import { useState } from 'react';

// base component: https://mui.com/material-ui/react-dialog/
const ViewEntryModal = ({ isOpen, onClose, onEdit }) => {
  const dispatch = useDispatch();
  const entry = useSelector((state) => state.entries.activeEntry);
  const tags = useSelector((state) => state.tags.tags);
  const tagMap = useMemo(() => getTags(tags), [tags]);
  const [alert, setAlert] = useState(false);

  const handleDelete = () => {
    setAlert(false);
    dispatch(deleteEntry(entry));
    onClose();
  }

  const handleEdit = () => {
    dispatch(editEntry(entry));
    onEdit();
  }

  if (!entry) return null;

  return (
    <>
      <Dialog
        onClose={onClose}
        open={isOpen}
        slotProps={{ // https://stackoverflow.com/questions/51722676/react-js-how-to-add-style-in-paperprops-of-dialog-material-ui
          paper: {
            sx: {
            width: '80vw',
            maxHeight: '60vh',
            borderRadius: 4,
            backgroundColor: 'rgb(251, 246, 239)',
            fontFamily: 'Outfit, sans-serif' 
          }
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontFamily: 'Outfit, sans-serif'  }}>
          {entry.title}
          <Typography sx={{ fontFamily: 'Outfit, sans-serif' }}>
            {getDate(entry.date)}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ fontFamily: 'Outfit, sans-serif' }}>
          <Typography sx={{ fontFamily: 'Outfit, sans-serif' }}>
            {entry.content}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {entry.tags.map((id) => {
              const tag = tagMap[id];
              return tag ? (
                <Chip key={tag.id} label={tag.id} sx={{ bgcolor: tag.color, m: 1, border:`2px solid ${tag.color}`, fontFamily: 'Outfit, sans-serif' }}/>
              ) : null;
            })}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => setAlert(true)}>
            Delete
            </Button>
            <Button onClick={handleEdit}>
              Edit
            </Button>
            </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alert}
        onClose={() => setAlert(false)}
        slotProps={{
          paper: {
            sx: { 
            borderRadius: 4
          }
          }
        }}>
          <DialogTitle sx={{ fontFamily: 'Outfit, sans-serif' }}>Are you sure you want to delete this entry?</DialogTitle>
          <DialogContent sx={{ fontFamily: 'Outfit, sans-serif' }}>Deleting this entry will remove it from your entries history and your mood graph. You will not be able to undo this action.</DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-around'}}>
            <Button onClick={() => setAlert(false)}>Nevermind</Button>
            <Button onClick={handleDelete}>Yes, delete</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewEntryModal;