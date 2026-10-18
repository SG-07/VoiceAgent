import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

const ArrowButton = ({
  direction = "left",
  onClick,
  disabled = false,
  ariaLabel,
  "aria-label": ariaLabelProp,
  title,
  className = "",
  iconClassName = "",
  type = "button",
  ...props
}) => {
  const isRight = direction === "right";
  const Icon = isRight ? ArrowRight : ArrowLeft;
  const label = ariaLabel || ariaLabelProp || (isRight ? "Next" : "Previous");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={title || label}
      className={twMerge(
        "flex h-9 w-9 items-center justify-center rounded-full border border-solid border-v2-stroke bg-v2-fill shadow-candidate-btn transition-all duration-150 hover:bg-v2-hover active:scale-95 cursor-pointer outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        className
      )}
      {...props}
    >
      <Icon
        className={twMerge("h-4 w-4 text-[#F7810F]", iconClassName)}
        strokeWidth={2}
      />
    </button>
  );
};

export default ArrowButton;
