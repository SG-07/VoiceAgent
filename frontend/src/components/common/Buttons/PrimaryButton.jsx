import React from "react";
import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

const VARIANT_CLASSES = {
  default:
    "bg-[#0071B6] text-white !shadow-candidate-btn-primary hover:bg-[#005E99]",
  light: "bg-white text-[#0071B6] !shadow-none hover:bg-white/90",
};

const PrimaryButton = ({
  label,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  startIcon = null,
  variant = "default",
  children,
}) => {
  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.default;

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      disableElevation
      className={twMerge(
        "text-v2-label-md font-v2 h-9 min-h-[36px] w-auto min-w-0 rounded-lg px-5 pt-[11px] pb-3 normal-case disabled:opacity-50",
        variantClasses,
        className
      )}
    >
      {startIcon}
      {children ?? label}
    </Button>
  );
};

export default PrimaryButton;
