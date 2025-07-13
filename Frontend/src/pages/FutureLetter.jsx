import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FutureLetter.css";
import EnvelopeAnimation from "../components/EnvelopeAnimation";
import successImage from "../images/ok.png";
import LetterButton from "../components/buttons/LetterButton";
//https://mui.com/material-ui/react-dialog/
const FutureLetter = () => {
  const [flowStep, setFlowStep] = useState("closed");

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpen = () => {
    setFlowStep("opening");
    setTimeout(() => {
      navigate("/write-letter");
    }, 1500);
  };

  useEffect(() => {
    if (location.state?.fromWrite) {
        setFlowStep("success");
    }
  }, [location.state]);

  return (
    <div>
      {flowStep !== "success" && <h1>Future Letter</h1>}
      {flowStep === "closed" && (
        <LetterButton onClick={handleOpen}>Open Envelope</LetterButton>
      )}
      {flowStep === "opening" && <EnvelopeAnimation isOpen={true} />}
      {flowStep === "success" && (
        <div className="success-message">
          <h2 style={{fontSize:"29px"}}>Letter sent successfully!</h2>
          <EnvelopeAnimation isOpen={false} />
        </div>
      )}
    </div>
  );
};

export default FutureLetter;
