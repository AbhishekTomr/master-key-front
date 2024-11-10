import React from "react";
import { Size, ButtonType } from "../../constants";
import { Button as MuiButton } from "@mui/material";
import "./Button.scss";

interface IButtonProps {
  size?: Size;
  className?: string;
  variant?: ButtonType;
  children: React.ReactNode;
  onClick: (args?: any[]) => any;
  disabled?: boolean;
}

const Button = ({
  size = Size.SMALL,
  className = "",
  variant = ButtonType.CONTAINED,
  onClick,
  children,
  disabled = false,
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
      {children}
    </MuiButton>
  );
};

export default Button;
