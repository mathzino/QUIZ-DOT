import React from "react";

interface Props {
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: (e: any) => any;
  radius?: string;
  width?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<Props> = ({ border, color, children, height, onClick, radius, width, type }) => {
  return (
    <button type={type} className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md " onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
