"use client";
import React, { CSSProperties } from "react";

interface ButtonSecondaryProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
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
      className={`btn btn__secondary ${className}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default ButtonSecondary;
