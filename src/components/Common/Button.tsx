import React from "react";
import { Size, ButtonType } from "../../constants";
import { Button as MuiButton } from "@mui/material";
import "./Button.scss";

interface IButtonProps {
  size?: Size;
  className?: string;
  variant?: ButtonType;
  children: React.ReactNode;
}

const Button = ({
  size = Size.SMALL,
  className = "",
  variant = ButtonType.CONTAINED,
  children,
}: IButtonProps) => {
  return (
    <MuiButton size={size} variant={variant} className={`btn ${className}`}>
      {children}
    </MuiButton>
  );
};

export default Button;
