"use client";
import React, { CSSProperties } from "react";

interface ButtonPrimaryProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  onClick = () => {},
  text = "Button",
  className = "",
  style = {},
  disabled = false,
}) => {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      style={style}
      className={`btn btn__primary ${className}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default ButtonPrimary;
