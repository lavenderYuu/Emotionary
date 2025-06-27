import { useState, useEffect } from 'react';
import LoginButton from '../components/buttons/LoginButton';
import LoginModal from '../components/LoginModal';
import logo from "../images/landing_page_logo.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Landing () {
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (location.state && location.state.fromLogout) {
            setShowLogout(true);
            navigate("/", { replace: true, state: {} });
        }
    }, [location.state]);

    return (
      <div>
        <div style={{
          backgroundColor: '#fefcfa',
          minHeight: '100vh', 
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center', 
          flexDirection: 'column', 
          marginTop: '-60px'
        }}>
          <img
            src={logo}
            width="300"
            style={{ marginBottom: '20px' }}
          />
          {showLogout && (
            <Box sx={{ mb: 3, fontFamily: 'Outfit', fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <CheckCircleOutlineIcon sx={{ mx: 1, color:'#4caf50' }} />
              <Box>You have successfully logged out.</Box>
            </Box>
          )}
          <LoginButton onClick={handleOpen} />
          <LoginModal open={open} onClose={handleClose} />
        </div>
      </div>
    )
}
