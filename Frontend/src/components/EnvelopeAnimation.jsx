import React, { useEffect, useRef } from "react";
import "./EnvelopeAnimation.css";
// https://codepen.io/orzoon/pen/zpNWpy
const EnvelopeAnimation = ({ isOpen, onOpenComplete, children }) => {
  const flapRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      openEnvelope();
    }
  }, [isOpen]);

  const openEnvelope = () => {
    flapRef.current?.classList.add("envelope-flap--open");
    flapRef.current?.classList.remove("envelope-flap--closed");

    setTimeout(() => {
      letterRef.current?.classList.add("envelope-letter--open");
      letterRef.current?.classList.remove("envelope-letter--closed");
      if (letterRef.current) letterRef.current.style.zIndex = "7";
      if (onOpenComplete) onOpenComplete();
    }, 400);
  };

  const closeEnvelope = () => {
    letterRef.current?.classList.remove("envelope-letter--open");
    letterRef.current?.classList.add("envelope-letter--closed");

    setTimeout(() => {
      flapRef.current?.classList.remove("envelope-flap--open");
      flapRef.current?.classList.add("envelope-flap--closed");
      if (letterRef.current) letterRef.current.style.zIndex = "5";
    }, 300);
  };

  return (
    <div className="envelope-animation">
      <div className="envelope-container">
        <div className="envelope-body"></div>
        <div
          ref={flapRef}
          className="envelope-flap envelope-flap--closed"
        ></div>
        <div
          ref={letterRef}
          className="envelope-letter envelope-letter--closed"
        >
          <div className="letter-body">
            <p>Dear Future Me,</p>
            <p>If you're reading this, I hope you're ...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
