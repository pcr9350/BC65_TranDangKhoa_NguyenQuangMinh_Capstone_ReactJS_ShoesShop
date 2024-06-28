import React from "react";

const UpDownActions = ({ product, handleUpDownBtn }) => {
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-between"
      style={{ width: '100%' }}
    >
      <button
        className="border-0 rounded-5 bg-primary"
        style={{ width: "40%" }}
        onClick={() => handleUpDownBtn("down")}
      >
        -
      </button>
      <p
        style={{ fontSize: "1rem", fontWeight: "400", width: "20%" }}
        className="my-auto mx-1 text-center"
      >
        {product?.count}
      </p>
      <button
        className="border-0 rounded-5 bg-primary"
        style={{ width: "40%" }}
        onClick={() => handleUpDownBtn("up")}
      >
        +
      </button>
    </div>
  );
};

export default UpDownActions;