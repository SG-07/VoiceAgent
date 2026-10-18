import React from "react";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

const SecondaryButton = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      disableElevation
      aria-label={ariaLabel}
      className={`text-v2-label-md ${twMerge(
        "font-v2 h-9 min-h-[36px] w-auto min-w-0 rounded-lg border-2 border-solid border-v2-stroke bg-v2-fill px-5 pt-[11px] pb-3 normal-case text-v2-muted !shadow-candidate-btn hover:bg-v2-hover disabled:!cursor-not-allowed disabled:opacity-50 disabled:!pointer-events-auto",
        className
      )}`}
    >
      {label}
    </Button>
  );
};

export default SecondaryButton;
