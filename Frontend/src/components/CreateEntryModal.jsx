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
import { tags } from "../assets/data/tags";

// base component: https://mui.com/material-ui/react-dialog/
const CreateEntryModal = ({ isOpen, onClose }) => {

  return (
    <>
      <Dialog
        onClose={onClose}
        open={isOpen}
        slotProps={{ // https://stackoverflow.com/questions/51722676/react-js-how-to-add-style-in-paperprops-of-dialog-material-ui
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
          <TextField required variant="outlined" placeholder='Title' sx={{width: 270, paddingRight: 2}} 
          slotProps={{ // https://stackoverflow.com/questions/51722676/react-js-how-to-add-style-in-paperprops-of-dialog-material-ui
            htmlInput: {
             maxLength: 40
            }
          }}/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
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
          <TextField required variant="outlined" placeholder='Today, I...' fullWidth multiline rows={6} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 0.5}}>
            {tags.map((tag) => (
              <Chip label={tag.id} sx={{ bgcolor: tag.color, mt: 1.25, mr: 1.5 }}/>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateEntryModal;