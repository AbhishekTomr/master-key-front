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
}

const Button = ({
  size = Size.SMALL,
  className = "",
  variant = ButtonType.CONTAINED,
  onClick,
  children,
}: IButtonProps) => {
  return (
    <MuiButton
      size={size}
      variant={variant}
      className={`btn ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
