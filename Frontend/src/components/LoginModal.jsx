import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CloseButton from './CloseButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  fontFamily: 'Outfit, sans-serif'
};

export default function LoginModal({ open, onClose }) {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleClose = () => {
    setShowSignIn(true);
    onClose();
  }

  const handleSuccess = (response) => {
    // placeholder function
  };

  const handleError = (error) => {
    // placeholder function
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          fontFamily: 'Outfit, sans-serif'
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2" align="center" fontFamily='Outfit, sans-serif'>
            {showSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <CloseButton onClick={handleClose}/>
          <Box
            component="form"
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            {showSignIn ?  (null) : (
              <div>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    fontFamily: 'Outfit, sans-serif',
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'Outfit, sans-serif',
                      '&.Mui-focused fieldset': {
                        borderColor: '#fbbbeb',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: 'Outfit, sans-serif',
                    },
                    '& label.Mui-focused': {
                      color: '#3d3d3d',
                      fontFamily: 'Outfit, sans-serif',
                    },
                  }}
                />
              </div>
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              sx={{
                fontFamily: 'Outfit, sans-serif',
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'Outfit, sans-serif',
                  '&.Mui-focused fieldset': {
                    borderColor: '#fbbbeb',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Outfit, sans-serif',
                },
                '& label.Mui-focused': {
                  color: '#3d3d3d',
                  fontFamily: 'Outfit, sans-serif',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              sx={{
                fontFamily: 'Outfit, sans-serif',
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'Outfit, sans-serif',
                  '&.Mui-focused fieldset': {
                    borderColor: '#fbbbeb',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Outfit, sans-serif',
                },
                '& label.Mui-focused': {
                  color: '#3d3d3d',
                  fontFamily: 'Outfit, sans-serif',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#ffe59a',
                color: '#3d3d3d',
                borderRadius: '30px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              {showSignIn ? 'Sign In' : 'Sign Up'}
            </Button>
            {showSignIn ? (
              <div>
                  <Typography align="center" color='#3d3d3d' fontFamily='Outfit, sans-serif'>
                  Not a member yet?
                  <span onClick={() => setShowSignIn(false)} style={{ color: '#a98ca7', marginLeft: '6px', cursor: 'pointer' }}>
                    Sign Up
                  </span>
                  .
                </Typography>
                <Typography align="center" fontFamily='Outfit, sans-serif' marginTop='10px' marginBottom='12px'>
                  or
                </Typography>
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </div>
            ) : (
              <div>
                <Typography align="center" color='#3d3d3d' fontFamily='Outfit, sans-serif'>
                Already a member?
                <span onClick={() => setShowSignIn(true)} style={{ color: '#a98ca7', marginLeft: '6px', cursor: 'pointer' }}>
                  Sign In
                </span>
                .
                </Typography>
                <Typography align="center" fontFamily='Outfit, sans-serif' marginTop='10px' marginBottom='12px'>
                  or
                </Typography>
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </div>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}