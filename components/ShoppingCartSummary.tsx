import React from "react";

const ShoppingCartSummary = (props) => {
  const { subtotal, taxes, shipping, total } = props;

  return (
    <div>
      <h4>
        <span>Subtotal:</span>
        <span style={{ float: "right" }}>
          {Math.round((subtotal * 100) / 100).toFixed(2)}
        </span>
      </h4>
      <h4>
        <span>Taxes:</span>
        <span style={{ float: "right" }}>
          {Math.round((taxes * 100) / 100).toFixed(2)}
        </span>
      </h4>
      <h4>
        <span>Shipping:</span>
        <span style={{ float: "right" }}>
          {Math.round((shipping * 100) / 100).toFixed(2)}
        </span>
      </h4>
      <h4 style={{ color: "#172162" }}>
        <span>Total:</span>
        <span style={{ float: "right" }}>
          {Math.round((total * 100) / 100).toFixed(2)}
        </span>
      </h4>
    </div>
  );
};

export default ShoppingCartSummary;
