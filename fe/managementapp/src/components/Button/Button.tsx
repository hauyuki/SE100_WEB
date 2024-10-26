"use client";

import React, { ButtonHTMLAttributes, FC } from "react";
import Loading from "./Loading";

export interface ButtonProps {
  className?: string;
  sizeClass?: string;
  fontSize?: string;
  pattern?: "primary" | "secondary" | "third" | "white" | "default";
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  pattern = "default",
  className = "",
  sizeClass = "py-3 px-4 sm:py-3.5 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  children,
  type,
  loading,
  onClick = () => {},
}) => {
  let colors =
    "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-50 dark:text-black";
  switch (pattern) {
    case "primary":
      colors = "bg-primary text-white";
      break;
    case "secondary":
      colors = "bg-secondary hover:bg-secondary text-secondary";
      break;
  }

  let CLASSES = `flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent ${colors} ${fontSize} ${sizeClass} ${className} `;

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && <Loading />}
      {children || `Button default`}
    </button>
  );
};

export default Button;
