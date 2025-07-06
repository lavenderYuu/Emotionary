import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloseButton from "./buttons/CloseButton";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/users/usersSlice";
import { Checkbox, useTheme } from '@mui/material';
import { Link } from "@mui/material";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function GoogleSetupModal({ user, open, hide }) {
  const [passkey, setPasskey] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClose = () => {
    setAgreedToPolicy(false);
    hide();
  };

  const handleAgreeToTerms = (e) => {
    setAgreedToPolicy(e.target.checked);
  };

  const handleChange = (e) => {
    setPasskey(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    await fetch("http://localhost:3000/users/complete-setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    });
  
    // TODO: verify passkey meets requirements and deriveKey

    dispatch(setUserId({ userId: user.id, userName: user.name }));
    navigate("/dashboard");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // TODO: verify passkey and getKey
    
    dispatch(setUserId({ userId: user.id, userName: user.name }));
    navigate("/dashboard");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
          >
            {user?.setupComplete ? "Sign In" : "Sign Up"}
          </Typography>
          <CloseButton onClick={handleClose} />
          <Box
            component="form"
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={user?.setupComplete
                ? (event) => {
                    event.preventDefault();
                    handleSignIn(event);
                  }
                : handleSignUp
            }
          >
            <TextField
              name="Passkey"
              label="Passkey"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={passkey}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#fbbbeb",
                  },
                },
                "& label.Mui-focused": {
                  color: "#3d3d3d",
                },
              }}
            />
            {user?.setupComplete ? "" : (
              <>
                <Typography variant="caption">
                  We require users who sign up using their Google email address to set up a passkey for security.
                  Your passkey is very important and is required to lock/unlock your journal. 
                  Please treat your passkey like a password and remember it. You will need it to log in.
                  If you lose your passkey, you will not be able to unlock your journal entries. 
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox 
                    checked={agreedToPolicy} 
                    onChange={handleAgreeToTerms} 
                    required
                    sx={{ p: 0, paddingRight: '8px' }}
                  />
                  <Typography variant="body2">
                    I agree to the {" "}
                    <Link 
                      onClick={() => setShowPolicy(true)} 
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      privacy policy
                    </Link>
                    .*
                  </Typography>
                </Box>
              </>
            )}
            <Button
              type="submit"
              disabled={!user?.setupComplete && !agreedToPolicy}
              variant="contained"
              sx={{
                backgroundColor: "#ffe59a",
                color: "#3d3d3d",
                borderRadius: "30px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              {user?.setupComplete ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
        </Box>
      </Modal>
      <PrivacyPolicyModal show={showPolicy} hide={() => setShowPolicy(false)} />
    </div>
  );
}
