import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloseButton from "./buttons/CloseButton";
import { useDispatch } from "react-redux";
import { setUserId } from "../features/users/usersSlice";

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
  fontFamily: "Outfit, sans-serif",
};

export default function LoginModal({ open, onClose }) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowSignIn(true);
    onClose();
  };

  const handleSuccess = (response) => {
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleError = (error) => {
    // placeholder function
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
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
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      alert("User registered successfully");
      setShowSignIn(true);
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
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      dispatch(setUserId(data.user._id));
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
        sx={{
          fontFamily: "Outfit, sans-serif",
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            align="center"
            fontFamily="Outfit, sans-serif"
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
                    fontFamily: "Outfit, sans-serif",
                    "& .MuiOutlinedInput-root": {
                      fontFamily: "Outfit, sans-serif",
                      "&.Mui-focused fieldset": {
                        borderColor: "#fbbbeb",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: "Outfit, sans-serif",
                    },
                    "& label.Mui-focused": {
                      color: "#3d3d3d",
                      fontFamily: "Outfit, sans-serif",
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
                fontFamily: "Outfit, sans-serif",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Outfit, sans-serif",
                  "&.Mui-focused fieldset": {
                    borderColor: "#fbbbeb",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "Outfit, sans-serif",
                },
                "& label.Mui-focused": {
                  color: "#3d3d3d",
                  fontFamily: "Outfit, sans-serif",
                },
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              sx={{
                fontFamily: "Outfit, sans-serif",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Outfit, sans-serif",
                  "&.Mui-focused fieldset": {
                    borderColor: "#fbbbeb",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "Outfit, sans-serif",
                },
                "& label.Mui-focused": {
                  color: "#3d3d3d",
                  fontFamily: "Outfit, sans-serif",
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#ffe59a",
                color: "#3d3d3d",
                borderRadius: "30px",
                fontFamily: "Outfit, sans-serif",
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
                  color="#3d3d3d"
                  fontFamily="Outfit, sans-serif"
                >
                  Not a member yet?
                  <span
                    onClick={() => {
                      setShowSignIn(false);
                      handleSignUp();
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
                  fontFamily="Outfit, sans-serif"
                  marginTop="10px"
                  marginBottom="12px"
                >
                  or
                </Typography>
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </div>
            ) : (
              <div>
                <Typography
                  align="center"
                  color="#3d3d3d"
                  fontFamily="Outfit, sans-serif"
                >
                  Already a member?
                  <span
                    onClick={() => setShowSignIn(true)}
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
                  fontFamily="Outfit, sans-serif"
                  marginTop="10px"
                  marginBottom="12px"
                >
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
