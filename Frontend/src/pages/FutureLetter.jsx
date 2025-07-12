import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LetterTextField from "../components/LetterTextField";
import "./FutureLetter.css";
import EnvelopeAnimation from "../components/EnvelopeAnimation";

const FutureLetter = () => {
  const [flowStep, setFlowStep] = useState("closed"); // closed, opening, writing, saving
  const [letterText, setLetterText] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setFlowStep("opening");
    setTimeout(() => {
      setFlowStep("writing");
    }, 1500);
  };

  const handleContinue = () => {
    setFlowStep("saving");
  };

  const handleSave = () => {
    setFlowStep("opening");
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setFlowStep("closed");
      setLetterText("");
      setEmail("");
      // Here you would typically send the data to your backend
      console.log("Letter saved:", { letterText, email });
    }, 1000);
  };

  return (
    <div>
      <h1>Future Letter</h1>

      {flowStep === "closed" && (
        <button
          className="future-letter-button"
          onClick={handleOpen}
        >
          Open Envelope
        </button>
      )}

      {flowStep === "opening" && <EnvelopeAnimation isOpen={true} />}

      {flowStep === "writing" && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <LetterTextField
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
                onClick={handleContinue}
                disabled={!letterText.trim()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {flowStep === "saving" && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Save Your Future Letter</h2>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address (to receive your letter):
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg"
              onClick={() => setFlowStep("writing")}
            >
              Back
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg disabled:opacity-50"
              onClick={handleSave}
              disabled={!email.trim() || isSaving}
            >
              {isSaving ? "Saving..." : "Save Letter"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureLetter;