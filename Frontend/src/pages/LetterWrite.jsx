import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LetterButton from "../components/buttons/LetterButton";
import "./FutureLetter.css";
import "./LetterWrite.css";

const LetterWrite = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    date: null,
    content: "",
  });

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleContinue = () => {
    setIsOpen(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    setIsOpen(false);

    const emailValue = event.target.email.value;

    if (!formData.date || !emailValue) return;

    const updatedFormData = {
      ...formData,
      email: emailValue,
    };

    console.log("Form Data:", updatedFormData);

    navigate("/timecapsule", { state: { fromWrite: true } });
  };

  return (
    <div>
      <div className="letter-container">
        <textarea
          className="letter-textarea"
          placeholder="Write your letter to the future..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>

      <div>
        <button
          className="future-letter-button"
          onClick={handleContinue}
          disabled={!formData.content.trim()}
        >
          Continue
        </button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <DialogContentText
            sx={{ fontSize: "1.2rem", color: "#333", margin: "10px 0 36px" }}
          >
            Please enter your email address and the date you want to receive
          </DialogContentText>

          <form onSubmit={handleSave}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "36px",
                marginLeft: "15px",
                marginRight: "15px",
              }}
            >
              <TextField
                autoFocus
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  label="Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      error: !formData.date && formSubmitted,
                      helperText:
                        !formData.date && formSubmitted
                          ? "Please select a date"
                          : "",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <DialogActions>
              <LetterButton onClick={() => setIsOpen(false)}>
                Cancel
              </LetterButton>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#ffe59a",
                  color: "#3d3d3d",
                  borderRadius: "30px",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 500,
                  textTransform: "none",
                  margin: "8px",
                  textDecoration: "none",
                  "&:hover": {
                    boxShadow: 8,
                  },
                }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LetterWrite;
