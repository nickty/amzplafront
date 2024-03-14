import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({ onClick, loading, disabled, children }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled || loading}
      style={{ position: "relative" }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
