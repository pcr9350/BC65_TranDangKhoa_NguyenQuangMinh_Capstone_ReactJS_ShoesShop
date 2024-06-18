import React from "react";
import { NavLink } from "react-router-dom";
import ButtonBuyProduct from "./ButtonBuyProduct";
const ProductCard = (props) => {
  let { product } = props;
  return (
    <div className="card">
      <img src={product.image} alt="..." />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <NavLink to={`/detail/${product.id}`} className={"btn btn-dark"}>
          View Detail
        </NavLink>
        <ButtonBuyProduct product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
