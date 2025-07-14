import { Children } from "react";
import Button from "@mui/material/Button"; 

const LetterButton = ({ onClick, children, ...props }) => {
  return (
    <Button
      onClick={onClick}
      {...props}
      sx={{
        backgroundColor: "#ffe59a",
        color: "#3d3d3d",
        borderRadius: "30px",
        fontWeight: 500,
        textTransform: "none",
        margin: "8px",
        textDecoration: "none",
        padding: "8px 16px",
        "&:hover": {
          boxShadow: 8,
        },
        ":disabled": {
          backgroundColor: "#d1d5db",
          color: "#6b7280",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default LetterButton;
