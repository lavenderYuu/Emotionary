import { useState, useEffect } from 'react';
import LoginButton from '../components/buttons/LoginButton';
import LoginModal from '../components/LoginModal';
import light_logo from "../images/landing_page_logo.png"
import dark_logo from "../images/landing_page_logo_dark.png"
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Landing () {
    const [open, setOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const logo = theme.palette.mode === 'light' ? light_logo : dark_logo;
    const backgroundColor = theme.palette.mode === 'light' ? '#fefcfa' : '#3d3d3d';

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (location.state && location.state.fromLogout) {
            setShowLogout(true);
            navigate("/", { replace: true, state: {} });
        }
    }, [location.state]);

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: backgroundColor,
          minHeight: '100vh', 
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center', 
          flexDirection: 'column', 
          marginTop: '-60px',
          maxWidth: '350px',
          margin: '0 auto',
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
