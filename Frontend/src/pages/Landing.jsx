import React, { useState } from 'react';
import LoginButton from '../components/LoginButton';
import LoginModal from '../components/LoginModal';


export default function Landing () {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            src="/images/landing_page_logo.png"
            width="300"
            style={{ marginBottom: '20px' }}
          />
          <LoginButton onClick={handleOpen} />
          <LoginModal open={open} onClose={handleClose} />
        </div>
      </div>
    )
}
