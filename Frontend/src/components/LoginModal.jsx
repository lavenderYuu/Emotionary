import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloseButton from "./buttons/CloseButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/users/usersSlice";
import { Checkbox, useTheme } from '@mui/material';
import { Link } from "@mui/material";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import GoogleSetupModal from "./GoogleSetUpModal";
import { deriveKey } from "../utils/crypto";
import PasskeyRequirements, { getPasskeyRequirements } from "./PasskeyRequirements";

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

export default function LoginModal({ open, onClose, setCryptoKey }) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [googleUser, setGoogleUser] = useState(null);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const requirements = getPasskeyRequirements(formData.password);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClose = () => {
    setShowSignIn(true);
    setAgreedToPolicy(false);
    onClose();
  };

  const handleGoogleSetUpClose = () => {
    setGoogleUser(null);
    setShowGoogleModal(false);
  };

  const handleAgreeToPolicy = (e) => {
    setAgreedToPolicy(e.target.checked);
  };

  const handleSuccess = async (response) => {
    const idToken = response.credential;

    try {
      const response = await fetch("http://localhost:3000/users/google-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google authentication failed");
      }

      setGoogleUser({ id: data.user._id, name: data.user.name, setupComplete: data.user.setupComplete });
      setShowGoogleModal(true);
    } catch (error) {
      console.error("Error during Google authentication:", error);
      alert("Google authentication failed: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (error) => {
    console.log("Google login error:", error);
    window.alert("Google login failed. Please try again.");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Verify whether password meets requirements
    if (!requirements.length || !requirements.uppercase || !requirements.number || !requirements.symbol) {
      window.alert("Your password must meet all requirements.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      alert("User registered successfully");
      setShowSignIn(true);
      setFormData({ firstName: "", email: "", password: "" }); 
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Derive key from password and use user ID as salt
      const key = await deriveKey(formData.password, data.user._id);
      setCryptoKey(key);

      dispatch(setUserId({ userId: data.user._id, userName: data.user.name }));
      localStorage.setItem("onboarded", data.user.onboarded);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed: " + error.message);
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
            {showSignIn ? "Sign In" : "Sign Up"}
          </Typography>
          <CloseButton onClick={handleClose} />
          <Box
            component="form"
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
            onSubmit={
              showSignIn
                ? (event) => {
                    event.preventDefault();
                    handleSignIn(event);
                  }
                : handleSignUp
            }
          >
            {showSignIn ? null : (
              <div>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.firstName}
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
              </div>
            )}
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
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
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.password}
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showSignIn ? "" : (
              <PasskeyRequirements requirements={requirements} isPasskey={false} />
            )}
            {showSignIn ? "" : (
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
            )}
            <Button
              type="submit"
              disabled={!showSignIn && !agreedToPolicy}
              variant="contained"
              sx={{
                backgroundColor: "#ffe59a",
                color: "#3d3d3d",
                borderRadius: "30px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              {showSignIn ? "Sign In" : "Sign Up"}
            </Button>
            {showSignIn ? (
              <div>
                <Typography
                  align="center"
                  color={theme.palette.text.primary}
                >
                  Not a member yet?
                  <span
                    onClick={() => {
                      setShowSignIn(false);
                    }}
                    style={{
                      color: "#a98ca7",
                      marginLeft: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </span>
                  .
                </Typography>
                <Typography
                  align="center"
                  marginTop="10px"
                  marginBottom="12px"
                >
                  or
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                </Box>
              </div>
            ) : (
              <div>
                <Typography
                  align="center"
                  color={theme.palette.text.primary}
                >
                  Already a member?
                  <span
                    onClick={() => {
                      setShowSignIn(true);
                      setAgreedToPolicy(false);
                    }}
                    style={{
                      color: "#a98ca7",
                      marginLeft: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </span>
                  .
                </Typography>
                <Typography
                  align="center"
                  marginTop="10px"
                  marginBottom="12px"
                >
                  or
                </Typography>
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                </Box>
              </div>
            )}
          </Box>
        </Box>
      </Modal>
      <GoogleSetupModal user={googleUser} open={showGoogleModal} hide={handleGoogleSetUpClose} setCryptoKey={setCryptoKey} />
      <PrivacyPolicyModal show={showPolicy} hide={() => setShowPolicy(false)} />
    </div>
  );
}
