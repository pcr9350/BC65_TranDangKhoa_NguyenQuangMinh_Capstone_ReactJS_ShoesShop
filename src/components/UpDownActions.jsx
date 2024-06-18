import React from "react";

const UpDownActions = ({ product, handleUpDownBtn }) => {
  return (
    <div
      className="d-flex flex-row align-items-center gap-3 justify-content-between"
      style={{ width: 130 }}
    >
      <button
        className="border-0"
        style={{ width: 40, height: 40 }}
        onClick={() => handleUpDownBtn("down")}
      >
        -
      </button>
      <p
        style={{ fontSize: 20, fontWeight: 600, width: 30 }}
        className="my-auto mx-auto text-center"
      >
        {product?.count}
      </p>
      <button
        className="border-0"
        style={{ width: 40, height: 40 }}
        onClick={() => handleUpDownBtn("up")}
      >
        +
      </button>
    </div>
  );
};

export default UpDownActions;
