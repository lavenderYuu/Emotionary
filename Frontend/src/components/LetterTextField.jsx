// LetterTextField.js
import React from "react";

const LetterTextField = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <textarea
        className="w-full h-96 p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Write your heartfelt letter to the future..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LetterTextField;
