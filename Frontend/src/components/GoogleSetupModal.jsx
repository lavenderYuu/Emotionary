import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloseButton from "./buttons/CloseButton";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/users/usersSlice";
import { Checkbox, useTheme } from '@mui/material';
import { Link } from "@mui/material";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import PasskeyRequirements, { getPasskeyRequirements } from "./PasskeyRequirements";
import { deriveKey, encryptContent, decryptContent } from "../utils/crypto";

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

export default function GoogleSetupModal({ user, open, hide, setCryptoKey }) {
  const [passkey, setPasskey] = useState("");
  const [showPasskey, setShowPasskey] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const requirements = getPasskeyRequirements(passkey);

  const handleClose = () => {
    setAgreedToPolicy(false);
    hide();
  };

  const handleAgreeToPolicy = (e) => {
    setAgreedToPolicy(e.target.checked);
  };

  const handleChange = (e) => {
    setPasskey(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Verify whether passkey meets requirements
    if (!requirements.length || !requirements.uppercase || !requirements.number || !requirements.symbol) {
      window.alert("Your passkey must meet all requirements.");
      return;
    }

    // Derive key from passkey and use user ID as salt
    const key = await deriveKey(passkey, user.id);
    setCryptoKey(key);

    // Encrypts the string "verified" with the derived key
    // This will be used to verify the passkey during login
    const { iv, content } = await encryptContent("verified", key);
    
    await fetch("http://localhost:3000/users/complete-setup", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, verifyPasskey_content: content, verifyPasskey_iv: iv }),
    });

    dispatch(setUserId({ userId: user.id, userName: user.name }));
    navigate("/dashboard");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Derive key from passkey and use user ID as salt
    const key = await deriveKey(passkey, user.id);

    // Fetch the encrypted verification value and IV from the server
    const response = await fetch(`http://localhost:3000/users/verify-passkey/${user.id}`);
    if (!response.ok) {
      window.alert("Could not verify user.");
      return;
    }
    const { iv, content } = await response.json();

    try {
      // Try to decrypt the verification value using the derived key
      const decryptedValue = await decryptContent(content, iv, key);
      if (decryptedValue !== "verified") {
        window.alert("Invalid passkey. Please try again.");
        return;
      }

      // Verification successful
      setCryptoKey(key);
      dispatch(setUserId({ userId: user.id, userName: user.name }));
      navigate("/dashboard");
    } catch (err) {
      window.alert("Invalid passkey. Please try again.");
    }
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
              type={showPasskey ? "text" : "password"}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPasskey ? "Hide passkey" : "Show passkey"}
                      onClick={() => setShowPasskey((show) => !show)}
                      edge="end"
                    >
                      {showPasskey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Passkey requirements */}
            {!user?.setupComplete && (
              <PasskeyRequirements requirements={requirements} />
            )}
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
                    onChange={handleAgreeToPolicy} 
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
