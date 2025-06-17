import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { selectSortedTags } from '../features/tags/tagsSelectors';
import SaveButton from './buttons/SaveButton'
import { fetchEntries } from '../features/entries/entriesSlice';
import { useDispatch } from 'react-redux';

// base component: https://mui.com/material-ui/react-dialog/
const CreateEditEntryModal = ({ isOpen, onClose, onSave, mode}) => {
  const entry = useSelector((state) => state.entries.activeEntry);
  const nextId = useSelector((state) => state.entries.nextId);
  const tags = useSelector(selectSortedTags);
  const [formData, setFormData] = useState({
    title: '',
    date: null,
    content: ''
  });
  const [activeTags, setActiveTags] = useState([]); // this is a list of tag ids
  const [id, setId] = useState('');
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  // const [tags, setTags] = useState([]); // TODO: User-specific tags
  // Fetch user-specific tags and entry data from backend when modal opens
  useEffect(() => {
    if (isOpen) {
      // fetch(`http://localhost:3000/tags/${userId}`)
      //   .then(res => res.json())
      //   .then(data => setTags(data))
      //   .catch(err => console.error('Failed to fetch tags for user:', err));

      // fetch(`http://localhost:3000/entries/${entry._id}`)
      //   .then(res => res.json())
      //   .then(data => setEntry(data))
      //   .catch(err => console.error('Failed to fetch entries:', err));
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (entry) {
      setFormData({ title: entry.title, date: dayjs(entry.date), content: entry.content });
      setActiveTags(entry.tags);
      setId(entry._id);
    }
  }, [entry]);

  useEffect(() => {
    if (mode === 'create') {
      setFormData({ title: '', date: null, content: '' });
      setActiveTags([]);
    } else if (mode === 'edit') {
      setFormData({ title: entry.title, date: dayjs(entry.date), content: entry.content });
      setActiveTags(entry.tags);
      setId(entry._id);
    }
  }, [mode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date
    }));
  };

  const handleSubmit = async () => {
    const { title, date, content } = formData;
    const isValid = (title.trim() !== '') && date && (content.trim() !== '');

    if (!isValid) {
      window.alert("Journal title, date, and content are required.");
    } else {
      onSave();

      const entryData = {
        title,
        date: date.toISOString(),
        content,
        tags: activeTags,
        favorite: entry?.favorite ? entry.favorite : false,
        user_id: '123', // TODO: Replace with actual user ID
        mood: '😊' // TODO: Replace with actual mood
      };

      try {
        let response;
        if (mode === "create") {
          console.log("in create mode");
          response = await fetch('http://localhost:3000/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entryData),
          });
        } else if (mode === "edit") {
          console.log("in edit mode");
          console.log(id);
          response = await fetch(`http://localhost:3000/entries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entryData),
          });
        }

        if (!response.ok) {
          throw new Error('Failed to save entry');
        }

        setId("");
        setFormData({ title: '', date: null, content: '' });
        await response.json();
        dispatch(fetchEntries());
      } catch (err) {
        window.alert(err.message);
      }
    }
  }

  const handleClose = () => {
    setAlert(false);
    setFormData({ title: '', date: null, content: '' });
    setActiveTags([]);
    onClose();
  }

  const toggleTag = (id) => {
    const exists = activeTags.some((tid) => tid === id );
    
    if (activeTags.length < 3) { // max 3 tags per entry
      if (exists) {
        const filteredTags = activeTags.filter((tid) => tid !== id );
        setActiveTags(filteredTags);
      } else {
        setActiveTags([...activeTags, id])
      }
    } else {
      if (exists) {
        const filteredTags = activeTags.filter((tid) => tid !== id );
        setActiveTags(filteredTags);
      }
    }    
  };

  return (
    <>
      <Dialog
        onClose={()=> setAlert(true)}
        open={isOpen}
        slotProps={{ // https://stackoverflow.com/questions/51722676/react-js-how-to-add-style-in-paperprops-of-dialog-material-ui
          paper: {
            sx: { 
            width: '80vw',
            borderRadius: 4,
            backgroundColor: 'rgb(251, 246, 239)',
            fontFamily: 'Outfit, sans-serif'
          }
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems:'flex-end' }}>
          {/* Title field */}
          <TextField required name='title' variant="outlined" placeholder='Title' sx={{width: 270, paddingRight: 2}} 
          slotProps={{ // https://stackoverflow.com/questions/51722676/react-js-how-to-add-style-in-paperprops-of-dialog-material-ui
            htmlInput: {
            maxLength: 40,
            style: { fontFamily: 'Outfit, sans-serif' }
            }
          }}
          value={formData.title}
          onChange={handleInputChange}
          />
          {/* Date picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              required 
              disableFuture
              label='Date'
              value={formData.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=> setAlert(true)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
          })}
        >
          <CloseIcon />
        </IconButton>
        {/* Main entry field */}
        <DialogContent dividers sx={{ p: 2 }}>
          <TextField required name='content' variant="outlined" placeholder="Today, I'm feeling..." fullWidth multiline rows={8} 
            value={formData.content}
            onChange={handleInputChange}
            sx={{ fontFamily: 'Outfit, sans-serif' }}
            InputProps={{ style: { fontFamily: 'Outfit, sans-serif' } }}
            InputLabelProps={{ style: { fontFamily: 'Outfit, sans-serif' }} }
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 0.5}}>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.id} sx={{ bgcolor: tag.color, mt: 1, mr: 1, cursor: 'pointer', border: activeTags.some((tid) => tid === tag.id) ? '2px solid #414141' : `2px solid ${tag.color}`, fontFamily: 'Outfit, sans-serif' }}
                onClick={() => toggleTag(tag.id)} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <SaveButton type='submit' onClick={handleSubmit} />
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
          <DialogTitle sx={{ fontFamily: 'Outfit, sans-serif' }}>Are you sure you want to leave?</DialogTitle>
          <DialogContent sx={{ fontFamily: 'Outfit, sans-serif' }}>Any changes you have made will not be saved.</DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Outfit, sans-serif'}}>
            <Button onClick={() => setAlert(false)}>Continue editing</Button>
            <Button onClick={handleClose}>Yes, I want to close</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateEditEntryModal;