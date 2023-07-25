import React from "react";
import { Input } from "reactstrap";

const ZouluInput = (props) => {
  return (
    <Input
      type={props.type && props.type}
      name={props.name && props.name}
      className={props.className && props.className}
      value={props.value}
      onChange={props.onChange && props.onChange}
      disabled={props.disabled && props.disabled}
      {...props}
    />
  );
};

export default ZouluInput;
