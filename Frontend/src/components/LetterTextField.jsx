// LetterTextField.js
import React from "react";

const LetterTextField = ({ value, onChange }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <textarea
        placeholder="Write your letter to the future..."
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          height: "24rem",
          padding: "16px",
          fontSize: "1.125rem",
          color: "#1f2937",
          backgroundColor: "white",
          border: "2px solid #d1d5db", 
          borderRadius: "0.75rem", // rounded-xl
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          outline: "none",
          resize: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = "0 0 0 8px #fbf6ef"; // focus ring
          e.target.style.borderColor = "transparent";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          e.target.style.borderColor = "#d1d5db";
        }}
      />
    </div>
  );
};

export default LetterTextField;
  