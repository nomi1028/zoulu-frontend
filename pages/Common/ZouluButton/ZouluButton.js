import React from "react";
import { Button } from "@mui/material";
import styles from "../../../styles/Home.module.css";
function ZouluButton(props) {
  return (
    <Button
      style={props.style && props.style}
      className={`${styles.ZouluButton} ${props.disabled ? styles.DisabledButton : styles.ActiveButton} ${props.className && props.className}`}
      startIcon={props.startIcon && props.startIcon}
      endIcon={props.endIcon && props.endIcon}
      onClick={props.onClick && props.onClick}
      disabled={props.disabled && props.disabled}
    >
      {props.title && props.title}
    </Button>
  );
}
export default ZouluButton;
