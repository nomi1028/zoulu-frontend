import React, { useState, useEffect } from "react";

function AdjustableTextarea({ value, setValue, ...rest }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(textareaRef.current.scrollHeight);
  }, [value]);
  const textareaRef = React.createRef();

  return <textarea ref={textareaRef} {...rest} value={value} onChange={(e) => setValue(e.target.value)} style={{ height: height, overflow: "hidden", resize: "none" }} />;
}

export default AdjustableTextarea;
