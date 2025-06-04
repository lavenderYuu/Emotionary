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
import { Box, Chip, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { selectSortedTags } from '../features/tags/tagsSelectors';

// a copy of CreateEntryModal but with values filled in
const EditEntryModal = ({ isOpen, onClose, onSave }) => {
  const entry = useSelector((state) => state.entries.activeEntry);
  const tags = useSelector(selectSortedTags);
  
  const [formData, setFormData] = useState({
    title: '',
    date: null,
    content: ''
  });
  const [activeTags, setActiveTags] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (entry) {
      setFormData({ title: entry.title, date: dayjs(entry.date), content: entry.content });
      setActiveTags(entry.tags);
      setId(entry.id);
    }
  }, [entry]);

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

  const handleSubmit = () => {
    const { title, date, content } = formData;
    const isValid = (title.trim() !== '') && date && (content.trim() !== '');

    if (isValid) {
      onSave({
        id: id, title: title, date: date.toISOString(), content: content, tags: activeTags, favorite: false
      })
    } else {
      alert("Journal title, date, and content are required.");
    }
  }

  const toggleTag = (id) => {
    const exists = activeTags.some((tid) => tid === id );
    
    if (activeTags.length < 3) {
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
        onClose={onClose}
        open={isOpen}
        slotProps={{
          paper: {
            sx: { 
            width: '80vw',
            borderRadius: 4,
            backgroundColor: 'rgb(251, 246, 239)',
          }
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems:'flex-end' }}>
          <TextField required name='title' variant="outlined" placeholder='Title' sx={{width: 270, paddingRight: 2}} 
          slotProps={{
            htmlInput: {
            maxLength: 40
            }
          }}
          value={formData.title}
          onChange={handleInputChange}
          />
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
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ p: 2 }}>
          <TextField required name='content' variant="outlined" placeholder="Today, I'm feeling..." fullWidth multiline rows={8} 
            value={formData.content}
            onChange={handleInputChange}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 0.5}}>
            {tags.map((tag) => (
              <Chip key={tag.id} label={tag.id} sx={{ bgcolor: tag.color, mt: 1, mr: 1, cursor: 'pointer', border: activeTags.some((tid) => tid === tag.id) ? '2px solid #414141' : `2px solid ${tag.color}` }}
                onClick={() => toggleTag(tag.id)} />
            ))}
            <Link sx={{ mt: 1.25, mr: 1.5, fontSize: 'small' }} component="button" >Manage Tags</Link>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type='submit' onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditEntryModal;