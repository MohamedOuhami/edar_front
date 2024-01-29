import React from "react";

import { CustomButtonProps } from "interfaces/common";
import { Button } from "@mui/material";

const CustomButton = ({
  type,
  title,
  backgroundColor,
  color,
  disabled,
  fullWidth,
  icon,
  handleClick,
}: CustomButtonProps) => {
  return (
    <Button
    type={type === "submit" ? "submit" : "button"}
    disabled={disabled}
    sx={{
      flex: fullWidth ? 1 : "unset",
      padding : '10px 20px',
      width: fullWidth ? "100%" : 'fit-content',
      minWidth: 130,
      backgroundColor:backgroundColor,
      color:color,
      fontSize:16,
      fontWeight:600,
      gap: 1,
      textTransform:'capitalize',
      ":hover":{
        opacity:.9,
        backgroundColor:backgroundColor
      }
    }}
    onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
