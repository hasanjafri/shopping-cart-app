import React from "react";

const Swatch = (props) => {
  const { color } = props;

  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: "5px",
        border: "1px solid #6e7484",
      }}
    />
  );
};

export default Swatch;
