import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterTextField from "../components/LetterTextField";
import "./FutureLetter.css";
import EnvelopeAnimation from "../components/EnvelopeAnimation";
import successImage from "../../public/images/ok.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import LetterButton from "../components/buttons/LetterButton";
//https://mui.com/material-ui/react-dialog/
const FutureLetter = () => {
  const [flowStep, setFlowStep] = useState("closed"); // closed, opening, writing, saving
  const [letterText, setLetterText] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      date: null,
      content: "",
    });
  const navigate = useNavigate();

  const handleOpen = () => {
    setFlowStep("opening");
    setTimeout(() => {
      setFlowStep("writing");
    }, 1200);
  };

  const handleContinue = () => {
    setIsOpen(true);
  };
  const handleSave = (event) => {
    event.preventDefault();
    setIsOpen(false);
    setFlowStep("closing");
    setTimeout(() => {
      setFlowStep("success");
      setLetterText("");
      setEmail("");
      console.log("Letter saved:", { letterText, email });
    }, 1500);
  };

    const handleDateChange = (date) => {
      const now = dayjs();
      if (date.isAfter(now)) {
        showSnackbar("You can't select a future date or time.");
        return;
      }
      setEdited(true);
      setFormData((prev) => ({
        ...prev,
        date: date
      }));
    };

  return (
    <div>
      {flowStep !== "success" && <h1>Future Letter</h1>}

      {flowStep === "closed" && (
        <LetterButton onClick={handleOpen}>Open Envelope</LetterButton>
      )}
      {flowStep === "opening" && <EnvelopeAnimation isOpen={true} />}
      {flowStep === "closing" && <EnvelopeAnimation isOpen={false} />}
      {flowStep === "writing" && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <LetterTextField
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="future-letter-button"
                onClick={handleContinue}
                disabled={!letterText.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {flowStep === "success" && (
        <div className="success-message">
          <h1>Letter sent successfully!</h1>
          <img src={successImage} alt="" style={{ width: "200px" }} />
        </div>
      )}

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
                id="name"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  slotProps={{
                    popper: {
                      zindex: 10000,
                    },
                  }}
                  required
                  disableFuture
                  label="Date"
                  value={formData.date}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>

            <DialogActions>
              <Button
                onClick={() => setIsOpen(false)}
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
                Cancel
              </Button>
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

export default FutureLetter;
