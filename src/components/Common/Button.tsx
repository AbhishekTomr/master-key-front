import React from "react";
import { Size, ButtonType } from "../../constants";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import "./Button.scss";

interface IButtonProps {
  size?: Size;
  className?: string;
  variant?: ButtonType;
  children: React.ReactNode;
  onClick: (args?: any[]) => any;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  size = Size.SMALL,
  className = "",
  variant = ButtonType.CONTAINED,
  onClick,
  children,
  disabled = false,
  isLoading = false,
}: IButtonProps) => {
  return (
    <MuiButton
      size={size}
      variant={variant}
      className={`btn ${className}`}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {isLoading ? (
        <CircularProgress size={"small"} className="loader" />
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;
